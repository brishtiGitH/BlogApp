const express = require('express')
const router = express.Router();
const { authenticateUser } = require('../controllers/user');
const { createNewPost } = require('../controllers/post')

router.post('/create', authenticateUser, createNewPost);




module.exports = router;