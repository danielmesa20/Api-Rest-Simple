const jwt = require('jsonwebtoken');
const passport = require('passport');

exports.signUp = (req, res, next) => {
    passport.authenticate('local-signup', (err, user) => {
        if (!err) {
            const token = jwt.sign({ id: user.id },
                process.env.SECRET, {
                expiresIn: '24h'
            });
            return res.status(200).json({ token, err: null });
        }
        else {
            console.log("Error signup: ", err);
            return res.status(500).json({ token: null, err })
        }

    })(req, res, next);
};

exports.signIn = async (req, res, next) => {
    passport.authenticate('local-signin', (err, user) => {
        if (!err) {
            const token = jwt.sign({ id: user.id },
                process.env.SECRET, {
                expiresIn: '24h'
            });
            return res.status(200).json({ token });
        }
        else {
            console.log(err);
            return res.status(400).json({ err })
        }
    })(req, res, next);

};

exports.logout = (req, res, next) => {
    try {
        res.status(200).send({ token: null });
    } catch (e) {
        res.status(400).json({ message: 'There was a problem Logout' });
    }
}

