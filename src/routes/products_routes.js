const express = require("express");
const router = express.Router();
const productController = require("../controllers/product_controller");
const verifyToken = require('../controllers/token');

//Add New Product
router.post('/add', productController.newProduct);

//Find All Products
router.get('findAll', productController.allProducts);

//Delete One Product
router.delete('delete', productController.deleteProduct);

//Find One Product
router.get('findOne', productController.oneProduct);

//Update One Product
router.put('update', productController.updateProduct);

module.exports = router;
