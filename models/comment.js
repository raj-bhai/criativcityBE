
const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    user: { type: String, required: true },
    courseId: { type: mongoose.Schema.Types.ObjectId },
    videoId: { type: mongoose.Schema.Types.ObjectId },
    email: { type: String, required: true },
    data: { type: String },
    like: { type: Number, default: 0 },
    reply: [{
        _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
        user: { type: String, required: true },
        email: { type: String, required: true },
        data: [{ type: String }],
    }]
});

module.exports = mongoose.model('Comment', CommentSchema);
