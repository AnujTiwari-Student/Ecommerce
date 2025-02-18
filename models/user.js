const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username: String,
    email: String,
    password: String,
    cart: {
        type: Array,
        default: [],
    },
    isAdmin: Boolean,
    contact: Number,
    orders: {
        type: Array,
        default: [],
    },
    profilePic: String,
})

module.exports = mongoose.model('user' , userSchema)