const mongoose = require('mongoose')

const feedbackFormSchema = new mongoose.Schema({
    phone:{
        type: String,
        require:true
    },
    email:{
        type: String,
        require:true,
    },
    feedbacks:{
        type: String,
        require:true
    },
    read: {
        type: Boolean,
        default: false,
      },
      sentAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("feedbackform",feedbackFormSchema)