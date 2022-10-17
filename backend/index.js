const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const authRouter = require('./routes/auth');
const chatRoomRouter = require('./routes/chat-room');
const messageRouter = require('./routes/message');

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRouter);
app.use('/api/chat-room', chatRoomRouter);
app.use('/api/message', messageRouter);

function start() {
  try {
    mongoose.connect(
      'mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.6.0',
      {
        useUnifiedTopology: true,
        useNewUrlParser: true,
      },
    );

    mongoose.connection.on('error', (err) => {
      console.log('Mongoose Connection ERROR: ' + err.message);
    });

    mongoose.connection.once('open', () => {
      console.log('MongoDB Connected!');
    });

    server.listen(8000, () => {
      console.log('Server listening on port 8000');
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
        const payload = await jwt.verify(token.split(' ')[1], 'qwertyuiop');
        socket.userId = payload.userId;
        next();
      } catch (err) {
        console.log(err);
      }
    });

    io.on('connection', socket => {
      console.log('Connected: ' + socket.userId);


      socket.on('disconnect',  () => {
        console.log('Disconnected: ' + socket.userId);
      });
    })
  } catch (e) {
    console.log('Server Error', e.message);
    process.exit(1);
  }
}

start();
