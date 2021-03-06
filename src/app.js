const express = require('express');
const morgan = require('morgan'); 
const passport = require("passport");
const session = require('express-session');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
import { v4 as uuidv4 } from 'uuid';

//Initializations
const app = express();

//Connect two servers
app.use(cors())

//Email and Password auth
require('./passport/local_auth');

// Settings
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));

// Midlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));
//Multer
const storage = multer.diskStorage({
    destination: path.join(__dirname, 'public/uploads'),
    filename: (req, file, cb) => {
        cb(null, uuidv4() + path.extname(file.originalname));
    }
});
app.use(multer({storage}).single('myImage'));
app.use(session({
    secret: process.env.SECRET,
    saveUninitialized: false,
    resave: false
}));
app.use(passport.initialize());
app.use(passport.session());

//Global Variables
app.use((req, res, next) => {
    res.locals.user = req.user || null;
    next();
});

// Routes
app.use('/auth', require('./routes/auth_routes'));
app.use('/products', require('./routes/products_routes'));
app.use('/commentary', require('./routes/commentary_routes'));

module.exports = app;
