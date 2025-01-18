const User = require("../models/user");
const { validateToken } = require("../services/token");

const checkAuthentication = (cookieName) => {
    return async (req, res, next) => {
        const token = req.cookies[cookieName];

        if (!token) return next();
        try {
            const decoded = validateToken(token);

            const user = await User.findOne({ _id: decoded.id });
            req.user = user;

            next();
        } catch (err) {
            console.log(err.message);
            res.redirect('/login')
        }

    }
}
module.exports = checkAuthentication;
