const mongoose = require('mongoose');

// Create a schema for your banner data
const bannerSchema = new mongoose.Schema({
    videoName: String,
    videos: [{ type: String }],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Create a model based on the schema
module.exports = mongoose.model('BannerVideos', bannerSchema)
