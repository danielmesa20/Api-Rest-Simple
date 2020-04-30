const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err, null);
    }
});

passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true,
}, async (req, email, password, done) => {
    try {
        const userCheck = await User.findOne({ email });
        if (!userCheck) {
            const user = new User({
                username: req.body.username,
                email,
                password
            });
            user.password = await user.encryptPassword(password);
            await user.save()
                .then(user => {
                    return done(null, user);
                }).catch(err => {
                    return done(err, null);
                });
        } else {
            return done('Email ya registrado', null);
        }
    } catch (err) {
        return done(err, null);
    }
}));

passport.use('local-signin', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true,
}, async (req, email, password, done) => {
    try {
        const user = await User.findOne({ email });
        if (user) {
            if (user.validatePassword(password)) {
                return done(null, user);
            } else {
                return done('Contraseña erronea', null);
            }
        } else {
            return done('Email no registrado', null);
        }
    } catch (err) {
        return done(err, null);
    }
}));