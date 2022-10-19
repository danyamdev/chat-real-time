const Message = require('../models/message');

const errorHandler = require('../utils/error-handler');

exports.getById = async (req, res) => {
  try {
    const messages = await Message.find({
      chatroom: req.params.id,
    }). populate('user');

    res.json({
      status: 'success',
      messages
    });
  } catch (e) {
    errorHandler(res, e);
  }
};
