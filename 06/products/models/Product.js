const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProductSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true,
    },
    price: {
        type: Number,
        required: true,
        min: 0,
    },
    description: String,
    image: {
        data: Buffer, // An array
        contentType: String,
    },
    brand: String,
});

module.exports = mongoose.model('Product', ProductSchema);
