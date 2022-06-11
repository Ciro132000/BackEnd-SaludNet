const express = require('express');
const router = express.Router();

const {getUser, getAllUsers} = require('../controllers/users')

router.get('/user', getUser )
router.get('/', getAllUsers)

module.exports = router; 