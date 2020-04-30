const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth_controller");
const verifyToken = require('../controllers/token');

//SignIn
router.post('/signin', authController.signIn);

//SignUp
router.post('/signup', authController.signUp);

//Logout
router.get('/logout', verifyToken, authController.logout);

module.exports = router;
