const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const createNewUser = async (req, res) => {
    const { name, email, password, username } = req.body;
    try {
        bcrypt.hash(password, 10, async (err, hash) => {
            if (err) throw err;

            console.log("hash: ", hash);
            const createdUser = await User.create({ name, email, password: hash, username });

            //log in user after their account creation
            const token = jwt.sign({ email, userId: createdUser._id }, process.env.ACCESS_TOKEN);
            res.cookie('jwtToken', token);
            res.redirect('/profile');
        })
    } catch (err) {
        console.log(err.stack)
        res.send('server error.')
    }
}

const loginUser = async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) return res.send('invalid credentials.');

    try {
        bcrypt.compare(password, user.password, (err, result) => {
            if (err) throw err;
            if (result) {
                const token = jwt.sign({ email: user.email, userId: user._id }, process.env.ACCESS_TOKEN);
                res.cookie('jwtToken', token);
                return res.redirect('/profile');
            } else {
                res.send('invalid credentials.')
            }
        })
    } catch (err) {
        console.log(err.stack);
        res.status(500).send('internal server error');
    }

}

async function authenticateUser(req, res, next) {
    const token = req.cookies.jwtToken;
    if (!token) return res.render('login', { isLoggedin: false });
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN);
    console.log(decoded);
    const user = await User.findOne({ _id: decoded.userId });
    req.user = user;

    next();

}

module.exports = { createNewUser, loginUser, authenticateUser }