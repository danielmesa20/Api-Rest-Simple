const express = require("express");
const router = express.Router();
const commentaryController = require("../controllers/commentary_controller");
const verifyToken = require('../config/token');

//Add New Product
router.post('/add', verifyToken, commentaryController.addCommentary);

//Find All Products
router.get('/findCommentarys',verifyToken, commentaryController.getCommentarys);

module.exports = router;