const express = require('express')
const router = express.Router();
const { authenticateUser } = require('../controllers/user');
const { createNewPost, updatePost } = require('../controllers/post')

router.post('/create', authenticateUser, createNewPost);
router.post('/edit/:id', updatePost);



module.exports = router;