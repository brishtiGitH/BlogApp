const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    fullName: {
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
    },
    role: {
        type: String,
        enum: ['USER', 'ADMIN'],
        default: "USER"
    }
})

const User = new mongoose.model('users', userSchema);
module.exports = User;

