const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        default: "",
    },
    email: {
        type: String,
        required: true,
        default: "",
    },
    plan: {
        type: Boolean,
        required: false,
        default: false
    },
    password: {
        type: String,
        required: true,
    },
    referralCode: {
        type: String,
        required: true
    },
    clearedBalance: {
        type: Number,
        default: 0
    },
    unclearedBalance: {
        type: Number,
        default: 0
    },
    referredBy: {
        type: mongoose.Schema.Types.ObjectId,
        default: null
    },
    paymentDate: {
        type: Date,
        default: null
    }
});

module.exports = mongoose.model('User', userSchema);