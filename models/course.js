const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  courseName: { type: String, required: true },
  details: [{ type: String }],
  videos: [{
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
    title: { type: String, required: true },
    duration: { type: String, required: true },
    thumbnail: { type: String, required: true },
    url: { type: String, required: true },
    like: { type: Number, default: 0 },
    description: { type: String }
  }]
});

module.exports = mongoose.model('Course', courseSchema);
