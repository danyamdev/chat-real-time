const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRouter = require('./routes/auth');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRouter);

function start() {
  try {
    const options = {
      autoIndex: false,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      family: 4,
    };

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
