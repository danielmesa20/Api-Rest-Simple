const { Schema, model } = require('mongoose');

const CommentarySchema = new Schema({
    body: { type: String, required: true },
    product_id: { type: String, required: true },
    user_id: { type: String, required: true },
    date: {  type: Date, default: Date.now }
});

module.exports = model('Commentary', CommentarySchema);