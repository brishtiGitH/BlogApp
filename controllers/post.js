const User = require('../models/user')
const Post = require('../models/post')

const createNewPost = async (req, res) => {
    let { content } = req.body;
    let post = await Post.create({
        user: req.user._id,
        content
    })
    let user = await User.findOneAndUpdate({ _id: req.user._id },
        {
            $push: {
                posts: post._id
            }
        });

    res.redirect('/user/profile');
}

const updatePost = async (req, res) => {
    let { content } = req.body;
    const post = await Post.findOneAndUpdate({ _id: req.params.id }, {
        content
    })
    console.log(post)
    res.redirect('/user/profile');
}

const deletePost = async (req, res) => {
    let post = await Post.findOneAndDelete({ _id: req.params.id });
    res.redirect('/user/profile');
}
const handleLikePost = async (req, res) => {
    try {
        const currentPost = await Post.findOne({ _id: req.params.id });

        if (currentPost.likes.includes(req.user._id)) {
            let i = currentPost.likes.indexOf(req.user._id);
            currentPost.likes.splice(i, 1);
            currentPost.save();

            return res.redirect('/user/feed');
        }
        const post = await Post.findOneAndUpdate({ _id: req.params.id }, {
            $push: {
                likes: req.user._id
            }
        })

        res.redirect('/user/feed');
    } catch (err) {
        console.error('Error liking post:', err);
        res.status(500).send('Internal Server Error');
    }

}
module.exports = { createNewPost, updatePost, deletePost, handleLikePost };