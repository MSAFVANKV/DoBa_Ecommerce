const mongoose = require('mongoose');

const sliderSchema = new mongoose.Schema({
    file: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Slider = mongoose.model('Slider', sliderSchema);

module.exports = Slider;
