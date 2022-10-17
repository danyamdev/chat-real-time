const ChatRoom = require('../models/chat-room');

const errorHandler = require('../utils/error-handler');

exports.create = async (req, res) => {
  try {
    const { name, userId } = req.body;

    const chatRoom = await ChatRoom.findOne({ name });

    if (chatRoom) {
      return res.status(409).json({
        message: 'Комната с таким же именем найдена!',
        status: 'error'
      });
    }

    const chat = new ChatRoom({
      name,
      userId,
    });

    await chat.save();

    res.json({
      message: 'Чат создан!',
      status: 'success',
      chatRoomId: chat._id
    });
  } catch (e) {
    errorHandler(res, e);
  }
};

exports.getAll = async (req, res) => {
  try {
    const chatRooms = await ChatRoom.find();

    res.json({ chatRooms, status: 'success' });
  } catch (e) {
    errorHandler(res, e);
  }
};

exports.getById = async (req, res) => {
  try {
    const chatRoom = await ChatRoom.findById(req.params.id);

    res.json({ chatRoom, status: 'success' });
  } catch (e) {
    errorHandler(res, e);
  }
};

module.exports.delete = async (req, res) => {
  try {
    const chatroom = await ChatRoom.remove({
      _id: req.params.id,
    });

    res.json({
      status: 'success',
      message: 'Чат удален!',
      chatroom
    });
  } catch (e) {
    errorHandler(res, e);
  }
};