const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/session');
const {validatorRegisterProfile} = require('../validators/users')

const {getUser, getAllUsers, registerProfile, searchUser, setPost, userProfile } = require('../controllers/users')
const { uploadMiddleware } = require('../utils/handleStorage')

router.get('/user',authMiddleware, getUser )
router.get('/', authMiddleware, getAllUsers)

// Perfil de usuario
router.post('/user/profile',[authMiddleware,uploadMiddleware.fields([{name: 'image', maxCount: 1},{name: 'image_header', maxCount: 1}])],registerProfile)
// router.get('user/profile/:id')

router.get('/search', authMiddleware, searchUser)

// Perfil de usuarios 
router.get('/profile', userProfile)

module.exports = router; 