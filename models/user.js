const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "posts"  //name of the model
        }
    ],
    profilePic: {
        type: String,
        default: "default.png"
    }
})

const User = new mongoose.model('users', userSchema);
module.exports = User;

