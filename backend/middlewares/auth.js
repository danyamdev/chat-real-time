const jwt = require('jsonwebtoken');
const config = require('config');

const errorHandler = require('../utils/error-handler');

module.exports = (req, res, next) => {
  if (req.method === 'OPTIONS') return next();

  try {
    const token = req.headers.authorization.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Не авторизован!' });
    }

    const decoded = jwt.verify(token, config.get('JWT_SECRET'));
    req.user = decoded;
    next();
  } catch (e) {
    errorHandler(res, e);
  }
};
