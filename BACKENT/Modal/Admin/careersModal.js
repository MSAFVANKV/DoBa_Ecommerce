const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    department: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    education: {
        type: String,
        required: true,
    },
    experience: {
        type: String,
        required: true,
    },
    skills: {
        type: [String],
        required: true,
    },
    responsibilities: {
        type: [String],
        required: true,
    },
    additionalRequirements: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
},{timeStamps:true});

const Job = mongoose.model('Jobfeed', jobSchema);

module.exports = Job;
