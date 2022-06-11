const express = require('express');
const router = express.Router();

const validator = require('../validators/auth')
const { registerCtrl, loginCtrl } = require('../controllers/auth')

router.post('/register', validator.validatorRegister, registerCtrl)
router.post('/login', validator.validatorLogin, loginCtrl)

module.exports = router; 