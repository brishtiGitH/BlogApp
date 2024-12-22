require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser');
const { createNewUser, loginUser, authenticateUser } = require('./controllers/user');
const postRouter = require('./routes/post');
const User = require('./models/user');

mongoose.connect('mongodb://localhost:27017/authtestapp')
    .then(() => console.log("mongodb connected!"))
    .catch(() => console.log("mongb connection failed!"));

app.set('view engine', 'ejs');
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.use('/post', postRouter);

app.get('/profile', authenticateUser, async (req, res) => {
    let loggedInUser = await User.findOne({ _id: req.user._id }).populate('posts');
    res.render('profile', { user: loggedInUser });
})
app.get('/', (req, res) => {
    res.render('signup');
})
app.get('/login', (req, res) => {

    res.render('login', { isLoggedin: true });
})

app.post('/user/signup', createNewUser);
app.post('/user/login', loginUser);



app.use((err, req, res, next) => {
    console.log(err.stack);
    res.status(500).send("internal server error.")
})

app.listen(3000, () => console.log("server started!"))