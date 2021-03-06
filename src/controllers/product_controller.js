const Product = require("../models/Product");
const Commentary = require("../models/Commentary");
const Cloudinary = require("../config/cloudinary");
const fs = require('fs-extra');

exports.allProducts = async (req, res) => {
    try {
        const products = await Product.find().select('-description -stock');;
        return res.status(200).json({ err: null, products });
    } catch (err) {
        return res.status(400).json({ err: null });
    }
};

exports.userProducts = async (req, res) => {
    try {
        const products = await Product.find({ user_id: req.params.idUser });
        return res.status(200).json({ err: null, products });
    } catch (err) {
        return res.status(400).json({ err: null });
    }
};


exports.newProduct = async (req, res) => {

    const { name, description, category, price, stock, user_id } = req.body;

    //Upload image to Cloudinary
    const result = await Cloudinary.v2.uploader.upload(req.file.path);
    //New Product Object
    const newProduct = new Product({
        name,
        description,
        category,
        price,
        stock,
        imageURL: result.url,
        public_id: result.public_id,
        user_id
    });
    try {
        const product = await newProduct.save();
        await fs.unlink(req.file.path);
        return res.status(200).json(product);
    } catch (err) {
        console.log("Error add: ", err);
        return res.status(400).json({ err });
    }
};

exports.deleteProduct = async (req, res) => {
    const { idProduct } = req.params;
    try {
        const product = await Product.findByIdAndDelete({ _id: idProduct });
        await Cloudinary.v2.uploader.destroy(product.public_id);
        return res.status(200).json({ err: null });
    } catch (err) {
        return res.status(400).json({ err });
    }
}

exports.findOne = async (req, res) => {
    try {
        //Find product data
        const product = await Product.findById({ _id: req.params.idProduct });
        if (product != null) {
            //Find comments of the product
            const comments = await Commentary.find({ product_id: req.params.idProduct });
            if (comments != null) {
                return res.status(200).json({ err: null, product, comments });
            } else {
                return res.status(200).json({ err: null, product, comments: null });
            }

        } else {
            return res.status(400).json({ err: 'The product id does not exist', product: null });
        }

    } catch (err) {
        return res.status(400).json({ err, product: null, comments: null });
    }
}

exports.updateProduct = async (req, res) => {

    let { name, description, category, price, stock, imageURL, public_id } = req.body;

    if (req.file !== undefined) {
        //Delete old image of product
        await Cloudinary.v2.uploader.destroy(public_id);
        //Upload new image to Cloudinary
        const result = await Cloudinary.v2.uploader.upload(req.file.path);
        //Update imageURL and public_id
        imageURL = result.url;
        public_id = result.public_id;
    }

    try {
        const product = await Product.findByIdAndUpdate(
            { _id: req.params.idProduct },
            {
                name,
                description,
                category,
                price,
                stock,
                imageURL,
                public_id
            },
            {
                new: true,
                upsert: true
            });
        return res.status(200).json({ err: null, product });

    } catch (err) {
        return res.status(400).json({ err });
    }
}


exports.addComment = async (req, res) => {

    const { body, user_id, product_id } = req.body;

    console.log("body", product_id);

    const newCommentary = new Commentary({
        body,
        user_id,
        product_id,
    });

    try {
        const commentary = await newCommentary.save();
        return res.status(200).json({ comment: commentary });
    } catch (err) {
        console.log("Error add comment: ", err);
        return res.status(400).json({ err });
    }
};