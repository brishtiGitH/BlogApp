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

    res.redirect('/profile');
}

module.exports = { createNewPost };