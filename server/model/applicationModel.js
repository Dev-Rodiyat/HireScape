const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
  job: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
    required: true,
  },
  applicant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },

  resumeUrl: {
    type: String,
    required: true,
  },

  coverLetter: {
    type: String,
    default: '',
  },

  status: {
    type: String,
    enum: ['pending', 'reviewed', 'interview', 'offered', 'rejected'],
    default: 'pending',
  },

  appliedAt: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: true });

const Application = mongoose.model('Application', applicationSchema);

module.exports = { Application };
