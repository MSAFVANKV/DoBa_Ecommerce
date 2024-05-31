const mongoose = require("mongoose");

const appliedJobsSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  address: {
    type: String,
    require: true,
  },
  phone: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },

  position: {
    type: String,
    require: true,
  },
  workingExperience: {
    type: String,
    require: true,
  },
  prevcompany: {
    type: String,
    require: true,
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

module.exports = mongoose.model("appliedJobs", appliedJobsSchema);
