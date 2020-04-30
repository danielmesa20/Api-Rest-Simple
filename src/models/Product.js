const { Schema, model } = require('mongoose');

const ProductSchema = new Schema({
    nombre:     {type: String, required: true},
    precio:     {type: Number, required: true},
    categoria:  {type: String, required: true},
    create:     {type: Date, default: Date.now}
});

module.exports = model('Product', ProductSchema);