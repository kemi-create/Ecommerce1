const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
    image: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    items: {
        type: Number,
        required: true
    },
});

const Product = mongoose.model('Product', ProductSchema)

module.exports = Product;
