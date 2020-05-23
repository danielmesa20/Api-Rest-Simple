const { Schema, model } = require('mongoose');

const ProductSchema = new Schema({
    name:           {type: String, required: true},
    description:    {type: String, required: true},
    category:       {type: String, required: true},
    price:          {type: Number, required: true},
    stock:          {type: Number, required: true},
    create:         {type: Date, default: Date.now}
});

module.exports = model('Product', ProductSchema);