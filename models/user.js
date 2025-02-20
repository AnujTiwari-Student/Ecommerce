const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    cart: {
        type: [{
            productId: mongoose.Schema.Types.ObjectId,
            quantity: {
                type: Number,
                required: true,
                min: 1
            }
        }],
        default: [],
    },
    orders: {
        type: [{
            orderId: mongoose.Schema.Types.ObjectId,
            status: {
                type: String,
                enum: ['pending', 'shipped', 'delivered', 'cancelled'],
                default: 'pending'
            }
        }],
        default: [],
    },
    profilePic: {
        type: String,
        default: ''
    }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
