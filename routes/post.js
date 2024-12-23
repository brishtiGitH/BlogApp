const express = require('express')
const router = express.Router();
const { authenticateUser } = require('../controllers/user');
const { createNewPost, updatePost, deletePost, handleLikePost } = require('../controllers/post')

router.post('/create', authenticateUser, createNewPost);
router.post('/edit/:id', updatePost);
router.get('/delete/:id', deletePost);
router.get('/like/:id', authenticateUser, handleLikePost);



module.exports = router;