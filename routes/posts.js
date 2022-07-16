const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/session');

const postsController = require('../controllers/posts')
const { uploadPost } = require('../utils/handleStorage')


router.post('/create',[authMiddleware, uploadPost.array("files",10)] ,postsController.setPost)

module.exports = router; 