const express = require('express')
const router = express.Router();
const { authenticateUser, createNewUser, loginUser, showProfile, showFeed } = require('../controllers/user')


router.post('/signup', createNewUser);
router.post('/login', loginUser);
router.get('/profile', authenticateUser, showProfile);
router.get('/feed', authenticateUser, showFeed);



module.exports = router;