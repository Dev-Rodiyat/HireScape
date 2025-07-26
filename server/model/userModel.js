const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['jobseeker', 'employer', 'admin'], required: true },

  profile: {
    headline: String,
    bio: String,
    location: String,
    skills: [String],
    experience: [{
      company: String,
      title: String,
      startDate: Date,
      endDate: Date,
      description: String
    }],
    image: { type: String, default: null },
    resumeUrl: { type: String, default: null }
  },

  applications: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Application',
  }],

  savedJobs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
    },
  ],

  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    default: null,
  }
}, { timestamps: true });

const companySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  logoUrl: { type: String, default: null },

  socialMediaLinks: {
    website: { type: String, default: '' },
    facebook: { type: String, default: '' },
    x: { type: String, default: '' },
    instagram: { type: String, default: '' },
    linkedin: { type: String, default: '' },
    telegram: { type: String, default: '' },
  },

  location: { type: String, required: true },

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  teamMembers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],

  jobs: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
  }],

}, { timestamps: true });

userSchema.pre("save", async function (next) {
  if (!this.isModified("password") || !this.password) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model("User", userSchema);
const Company = mongoose.model("Company", companySchema);

module.exports = { User, Company };
