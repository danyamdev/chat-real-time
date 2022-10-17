const Message = require('../models/chat-room');

const errorHandler = require('../utils/error-handler');

exports.getById = async (req, res) => {
  try {
    const messages = await Message.find({
      chatroom: req.params.id,
    });

    res.json({
      status: 'success',
      messages
    });
  } catch (e) {
    errorHandler(res, e);
  }
};
