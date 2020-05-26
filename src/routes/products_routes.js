const express = require("express");
const router = express.Router();
const productController = require("../controllers/product_controller");
const verifyToken = require('../controllers/token');

//Add New Product
router.post('/add', productController.newProduct);
        
//Find All Products
router.get('/findAll', productController.allProducts);

//Delete One Product
router.delete('/delete/:idProduct', productController.deleteProduct);

//Find One Product
router.get('/findOne/:idProduct', productController.findOne);

//Update One Product
router.put('/update/:idProduct', productController.updateProduct);

module.exports = router;
