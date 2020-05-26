const Product = require("../models/Product");

exports.allProducts = async (req, res) => {
    try {
        const products = await Product.find();
        return res.status(200).json({ err: null, products });
    } catch (err) {
        return res.status(500).json({ err: null });
    }
};

exports.newProduct = async (req, res) => {
   
    const { name, description, category, price, stock } = req.body;
   
    const product = new Product({
        name,
        description,
        category,
        price,
        stock,
    });
    try {
        await product.save();
        return res.status(200).json({ err: null });
    } catch (err) {
        return res.status(500).json({ err });
    }
}

exports.deleteProduct = async (req, res) => {
    try {
        await Product.findByIdAndDelete({ _id: req.params.idProduct });
        return res.status(200).json({ err: null });
    } catch (err) {
        return res.status(500).json({ err });
    }
}

exports.findOne = async (req, res) => {
    try {
        const product = await Product.findById({ _id: req.params.idProduct });
        if (product != null) {
            return res.status(200).json({ err: null, product });
        } else {
            return res.status(500).json({ err: 'The product id does not exist', product: null });
        }

    } catch (err) {
        return res.status(500).json({ err, product: null });
    }
}

exports.updateProduct = async (req, res) => {

    const { name, description, category, price, stock } = req.body;
    
    try {
        const product = await Product.findByIdAndUpdate(
            { _id: req.params.idProduct },
            {
                name,
                description,
                category,
                price,
                stock,
            },
            {
                new: true,
                upsert: true
            });
        return res.status(200).json({ err: null, product });

    } catch (err) {
        return res.status(500).json({ err });
    }
}