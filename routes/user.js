const express = require('express')
const router = express.Router();
const { createNewUser, loginUser, showProfile, showFeed, logoutUser } = require('../controllers/user')


router.post('/signup', createNewUser);
router.post('/login', loginUser);
router.get('/profile', showProfile);
router.get('/feed', showFeed);

router.get('/logout', logoutUser);

module.exports = router;