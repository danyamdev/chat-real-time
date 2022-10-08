const router = require('express').Router();
const { check } = require('express-validator');

const controller = require('../controllers/auth');

const checkFields = [
  check('login', 'Символов от 3 до 10').isLength({
    min: 3,
    max: 10,
  }),
  check('password', 'Символов от 6 до 8')
    .isLength({
      min: 6,
      max: 8,
    })
    .exists(),
];

router.post('/login', checkFields, controller.login);

router.post('/register', checkFields, controller.registration);

module.exports = router;
