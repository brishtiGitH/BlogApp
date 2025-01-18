const User = require('../models/user');
const Post = require('../models/post');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { createToken } = require('../services/token');

const createNewUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        bcrypt.hash(password, 10, async (err, hash) => {
            if (err) throw err;
            const createdUser = await User.create({ fullName: name, email, password: hash });
            const token = createToken(createNewUser)
            res.cookie('jwtToken', token);
            res.redirect('/user/profile');
        })
    } catch (err) {
        console.log(err.stack)
        res.send('server error.')
    }
}

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.send('invalid credentials.');

    try {
        bcrypt.compare(password, user.password, (err, result) => {
            if (err) throw err;
            if (result) {
                const token = createToken(user);
                res.cookie('jwtToken', token);
                return res.redirect('/user/profile');
            } else {
                res.send('invalid credentials.')
            }
        })
    } catch (err) {
        console.log(err.stack);
        res.status(500).send('internal server error');
    }

}

const logoutUser = (req, res) => {
    res.clearCookie('jwtToken');
    res.redirect('/login');
}
const showProfile = async (req, res) => {
    let loggedInUser = await User.findOne({ _id: req.user?._id }).populate('posts');
    res.render('profile', { user: loggedInUser });
}
const showFeed = async (req, res) => {
    let posts = await Post.find({}).populate('user');

    res.render('feed', { posts, user: req.user });
}
module.exports = { createNewUser, loginUser, logoutUser, showProfile, showFeed };