const router = require('express').Router();

const controller = require('../controllers/message');

const auth = require('../middlewares/auth');

router.get('/:id', auth, controller.getById);

module.exports = router;
