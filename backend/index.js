const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const config = require('config');

const authRouter = require('./routes/auth');
const chatRoomRouter = require('./routes/chat-room');
const messageRouter = require('./routes/message');

const ChatRoom = require('./models/chat-room');
const User = require('./models/user');
const Message = require('./models/message');

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRouter);
app.use('/api/chat-room', chatRoomRouter);
app.use('/api/message', messageRouter);

const rooms = new Map();

function start() {
  try {
    mongoose.connect(config.get('DB'), {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });

    mongoose.connection.on('error', (err) => {
      console.log('Mongoose Connection ERROR: ' + err.message);
    });

    mongoose.connection.once('open', () => {
      console.log('MongoDB Connected!');
    });

    server.listen(config.get('PORT'), () => {
      console.log(`Server listening on port ${config.get('PORT')}`);
    });

    const io = new Server(server, {
      allowEIO3: true,
      cors: {
        origin: true,
        methods: ['GET', 'POST'],
        credentials: true,
      },
    });

    io.use(async (socket, next) => {
      try {
        const token = socket.handshake.auth.token;
        const payload = await jwt.verify(token.split(' ')[1], config.get('JWT_SECRET'));
        socket.userId = payload.userId;
        next();
      } catch (err) {
        console.log(err);
      }
    });

    io.on('connection', (socket) => {
      console.log('Connected: ' + socket.userId);

      socket.on('ROOM:JOIN', async (chatRoomId) => {
        try {
          const chatRoom = await ChatRoom.findById(chatRoomId);
          const user = await User.findById(socket.userId);

          if (!rooms.has(chatRoomId)) {
            rooms.set(chatRoomId, new Map([['users', new Map()]]));
          }

          socket.join(chatRoomId, socket.userId);

          const newUser = {
            login: user.login,
            userId: socket.userId,
          };

          rooms.get(chatRoomId).get('users').set(socket.userId, newUser);
          const users = [...rooms.get(chatRoomId).get('users').values()];

          io.to(chatRoomId).emit('ROOM:SET_USERS', users);

          if (chatRoom?.userId == socket.userId) {
            socket.to(chatRoomId).emit('ROOM:OWNER', {
              text: '?????????????????????? ???????????????? ????????????!',
              owner: socket.userId,
            });
          }
        } catch (e) {
          console.log(e);
        }
      });

      socket.on('ROOM:LEAVE', () => {
        rooms.forEach((value, roomId) => {
          if (value.get('users').delete(socket.userId)) {
            const users = [...rooms.get(roomId).get('users').values()];
            io.to(roomId).emit('ROOM:SET_USERS', users);
          }
        });
      });

      socket.on('ROOM:DELETE', async (chatRoomId) => {
        const chatRoom = await ChatRoom.deleteOne({ _id: chatRoomId });

        socket.broadcast.to(chatRoomId).emit('ROOM:DELETE', {
          text: '???????????????? ???????????? ????????????!',
          owner: chatRoom?.userId,
        });
      });

      socket.on('ROOM:NEW_MESSAGE', async ({ chatRoomId, text }) => {
        const user = await User.findById(socket.userId);

        const message = new Message({
          chatroom: chatRoomId,
          user: socket.userId,
          message: text,
        });

        await message.save();

        io.to(chatRoomId).emit('ROOM:NEW_MESSAGE', { ...message._doc, user });
      });

      socket.on('disconnect', () => {
        rooms.forEach((value, roomId) => {
          if (value.get('users').delete(socket.userId)) {
            const users = [...rooms.get(roomId).get('users').values()];
            io.to(roomId).emit('ROOM:SET_USERS', users);
          }
        });

        console.log('Disconnected: ' + socket.userId);
      });
    });
  } catch (e) {
    console.log('Server Error', e.message);
    process.exit(1);
  }
}

start();
