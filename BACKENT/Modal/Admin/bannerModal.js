const mongoose = require('mongoose');

// Create a schema for your banner data
const bannerSchema = new mongoose.Schema({
    bannerName: String,
    subtitle: String,
    file: {
        type: String,
    },
    image: {
        type: Object,
    },
    color: {
        type: String, // Assuming color is stored as a string (hex code)
        default: "#ffffff", // Default color
      },
    // videos: [{ type: String }],
    createdAt: {
        type: Date,
        default: Date.now,
    }
    
},{
        timeStamps:true
    });

// Create a model based on the schema
module.exports = mongoose.model('Banner', bannerSchema)
