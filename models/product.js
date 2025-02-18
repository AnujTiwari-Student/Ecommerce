const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    productName: String,
    price: Number,
    image: String,
    discount: {
        type: Number,
        default: 0,
    },
    bgColor: String,
    panelColor: String,
    textColor: String,
})

module.exports = mongoose.model('product' , productSchema)