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
    const product = new Product({
        nombre: req.body.nombre,
        precio: req.body.precio,
        categoria: req.body.categoria,
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
        await Product.findByIdAndDelete({ _id: req.id });
        return res.status(200).json({ err: null });
    } catch (err) {
        return res.status(500).json({ err });
    }
}

exports.oneProduct = async (req, res) => {
    try {
        const product = await Product.findById({ _id: req.id });
        return res.status(200).json({ err: null, product });
    } catch (err) {
        return res.status(500).json({ err });
    }
}

exports.updateProduct = async (req, res) => {
    try {
        const product = await Product.findOneAndUpdate(
            { _id: req.params.id },
            { nombre: req.nombre,
              precio: req.precio,
              categoria: req.categoria
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