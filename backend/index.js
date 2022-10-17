const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRouter = require('./routes/auth');
const chatRoomRouter = require('./routes/chat-room');
const messageRouter = require('./routes/message');

const app = express();

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

    app.listen(8000, () => {
      console.log('Server listening on port 8000');
    });
  } catch (e) {
    console.log('Server Error', e.message);
    process.exit(1);
  }
}

start();
