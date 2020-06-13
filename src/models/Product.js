const { Schema, model } = require('mongoose');

const ProductSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    imageURL: { type: String, required: true },
    public_id: { type: String, required: true },
    user_id: { type: String, required: true },
    create: { type: Date, default: Date.now }
});

module.exports = model('Product', ProductSchema);