require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser');
const User = require('./models/user');
const Post = require('./models/post');
const { authenticateUser } = require('./controllers/user')

mongoose.connect('mongodb://localhost:27017/authtestapp')
    .then(() => console.log("mongodb connected!"))
    .catch(() => console.log("mongb connection failed!"));

const postRouter = require('./routes/post');
const userRouter = require('./routes/user');


app.set('view engine', 'ejs');
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.use('/post', postRouter);
app.use('/user', userRouter);


app.get('/', (req, res) => {
    res.render('signup');
})
app.get('/login', (req, res) => {

    res.render('login', { isLoggedin: true });
})

app.get('/edit/:id', authenticateUser, async (req, res) => {
    const postId = req.params.id;
    const post = await Post.findOne({ _id: postId });
    res.render('editPost', { post });
})

app.get('/logout', (req, res) => {
    res.clearCookie('jwtToken');
    res.redirect('/login');
})

app.use((err, req, res, next) => {
    console.log(err.stack);
    res.status(500).send("internal server error.")
})

app.listen(3000, () => console.log("server started!"))