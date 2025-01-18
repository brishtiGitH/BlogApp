const jwt = require('jsonwebtoken');

const createToken = (user) => {
    const payload = {
        id: user._id,
        email: user.email,
    }
    const token = jwt.sign(payload, process.env.ACCESS_TOKEN);
    return token;
}
const validateToken = (token) => {
    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN);
        return decoded;

    } catch (err) {

    }
}

module.exports = { createToken, validateToken };