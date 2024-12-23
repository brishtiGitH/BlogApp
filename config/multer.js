const multer = require('multer');
const path = require('path')
const crypto = require('crypto');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images/profilePics');
    },
    filename: function (req, file, cb) {
        const newFileName = crypto.randomBytes(10).toString('hex') + path.extname(file.originalname);
        cb(null, newFileName);
    }
})

const upload = multer({ storage: storage });

module.exports = upload;
