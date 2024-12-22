const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    content: String,
}, { timestamps: true });

const Post = new mongoose.model('posts', postSchema);
module.exports = Post;

