const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/session');

const postsController = require('../controllers/posts')
const { uploadPost } = require('../utils/handleStorage')


router.post('/create',[authMiddleware, uploadPost.array("files",10)] ,postsController.setPost)

router.get('/user', authMiddleware, postsController.getPostUser)

router.get('/multimedia/:id', authMiddleware, postsController.multimediaPost)

module.exports = router; 