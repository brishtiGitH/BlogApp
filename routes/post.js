const express = require('express')
const router = express.Router();
const { createNewPost, updatePost, deletePost, handleLikePost, readPost } = require('../controllers/post')

router.post('/create', createNewPost);
router.post('/edit/:id', updatePost);
router.get('/delete/:id', deletePost);
router.get('/like/:id', handleLikePost);
router.get('/edit/:id', readPost);



module.exports = router;