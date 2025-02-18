const mongoose = require('mongoose')

const ownerSchema = mongoose.Schema({
    username: String,
    email: String,
    password: String,
    product: {
        type: Array,
        default: [],
    },
    profilePic: String,
    gstNumber: String,
})

module.exports = mongoose.model('owner' , ownerSchema)