const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

const User = require('../models/user');

const errorHandler = require('../utils/error-handler');

const createJWT = (payload, secretKey, options) =>
  jwt.sign(payload, secretKey, options);

module.exports.registration = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: 'Неверные данные!',
        status: 'error'
      });
    }

    const candidate = await User.findOne({ login: req.body.login });

    if (candidate) {
      return res.status(409).json({
        message: 'Пользователь уже существует!',
        status: 'error'
      });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      login: req.body.login,
      password: hashedPassword,
    });

    await user.save();

    const token = createJWT(
      { userId: user._id, login: user.login },
      'qwertyuiop',
      { expiresIn: '7d' },
    );

    res.status(201).json({
      token: `Bearer ${token}`,
      userId: user._id,
      status: 'success'
    });
  } catch (e) {
    errorHandler(res, e);
  }
};

module.exports.login = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: 'Неверные данные!',
        status: 'error'
      });
    }

    const { login, password } = req.body;

    const candidate = await User.findOne({ login });

    if (!candidate) {
      return res.status(404).json({
        message: 'Пользователь не найден!',
        status: 'error'
      });
    }

    const passwordResult = await bcrypt.compare(password, candidate.password);

    if (!passwordResult) {
      return res.status(404).json({
        message: 'Пользователь не найден!',
        status: 'error'
      });
    }

    const token = createJWT(
      { userId: candidate._id, login: candidate.login },
      'qwertyuiop',
      { expiresIn: '7d' },
    );

    res.status(200).json({
      token: `Bearer ${token}`,
      userId: candidate._id,
      status: 'success'
    });
  } catch (e) {
    errorHandler(res, e);
  }
};
