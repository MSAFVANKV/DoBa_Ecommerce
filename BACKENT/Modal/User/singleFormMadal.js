const mongoose = require('mongoose')

const singleForm = new mongoose.Schema({
    number:{
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
    productName:{
        type: String,
        require:true
    },
    command:{
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

module.exports = mongoose.model("singleProductForm",singleForm)