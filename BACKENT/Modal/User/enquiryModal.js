const mongoose = require('mongoose')

const enquiryFormSchema = new mongoose.Schema({
    contactNumber:{
        type: String,
        require:true
    },
    email:{
        type: String,
        require:true,
    },
    fullName:{
        type: String,
        require:true
    },
    
    businessType:{
        type: String,
        require:true
    },
    productType:{
        type: String,
        // require:true
        default: "both"
    },
    commends:{
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

module.exports = mongoose.model("enquiryform",enquiryFormSchema)