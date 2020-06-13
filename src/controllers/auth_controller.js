const jwt = require('jsonwebtoken');
const passport = require('passport');
const User = require("../models/User");

//Register
exports.signUp = async (req, res, next) => {
    passport.authenticate('local-signup', (err, user) => {

        if (!err) {
            return res.status(200).json({ err: null });
        }

        console.log("Error signup: ", err);
        return res.status(400).json({ err });

    })(req, res, next);
};

exports.signIn = async (req, res, next) => {
    passport.authenticate('local-signin', (err, user) => {
        if (!err) {
            const token = jwt.sign({ id: user._id },
                process.env.SECRET, {
                expiresIn: '24h'
            });
            return res.status(200).json({
                err: null,
                token,
                user: {
                    id: user._id,
                    username: user.username,
                    email: user.email
                }
            });
        }
        console.log("Error signIn: ", err);
        return res.status(400).json({ err });

    })(req, res, next);
};

exports.logout = (req, res, next) => {
    try {
        res.status(200).send({ token: null });
    } catch (e) {
        res.status(400).json({ message: 'There was a problem Logout' });
    }
};

exports.userData = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) {
            res.status(400).json({ err: 'User Does not exist' });
        }
        res.json(user);
    } catch (e) {
        res.status(400).json({ msg: e.message });
    }
}

