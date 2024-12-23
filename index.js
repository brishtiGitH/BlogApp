require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser');
const path = require('path');
const User = require('./models/user');
const Post = require('./models/post');
const upload = require('./config/multer');
const { authenticateUser } = require('./controllers/user')

mongoose.connect('mongodb://localhost:27017/blogapp')
    .then(() => console.log("mongodb connected!"))
    .catch(() => console.log("mongb connection failed!"));

const postRouter = require('./routes/post');
const userRouter = require('./routes/user');


app.set('view engine', 'ejs');
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/post', postRouter);
app.use('/user', userRouter);


app.get('/', (req, res) => {
    res.render('signup');
})
app.get('/login', (req, res) => {

    res.render('login', { isLoggedin: true });
})
app.get('/upload', (req, res) => {
    res.render('upload');
})

app.post('/profile/upload', authenticateUser, upload.single('profilePic'), async (req, res) => {
    await User.findOneAndUpdate({ _id: req.user._id }, { profilePic: req.file.filename });
    res.redirect('/user/profile');
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