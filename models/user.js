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
    }
}); 

module.exports = mongoose.model('User', userSchema);