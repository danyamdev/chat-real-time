const router = require('express').Router();

const controller = require('../controllers/chat-room');

const auth = require('../middlewares/auth');

router.post('/create', auth, controller.create);
router.get('/', auth, controller.getAll);
router.get('/:id', auth, controller.getById);
router.delete('/:id', auth, controller.delete);

module.exports = router;
