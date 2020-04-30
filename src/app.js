const express = require('express');
const morgan = require('morgan');
const passport = require("passport");
const session = require('express-session');

//Initializations
const app = express();
require('./passport/local_auth');

// Settings
app.set('port', process.env.PORT || 3000);

// Midlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(morgan('dev'));
app.use(session({
    secret: process.env.SECRET,
    saveUninitialized: false,
    resave: false
}));
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/auth', require('./routes/auth_routes'));
app.use('/products', require('./routes/products_routes'));

module.exports = app;