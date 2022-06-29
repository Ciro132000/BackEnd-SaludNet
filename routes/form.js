const express = require('express');
const router = express.Router();

const { privaciesLevel } = require('../controllers/form.js')

router.get('/privacies-level', privaciesLevel)

module.exports = router; 