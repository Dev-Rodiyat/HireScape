const { default: mongoose } = require("mongoose");

const jobSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    jobSummary: { type: String }, // ✅ short version of description

    location: { type: String, default: '' },
    remote: { type: Boolean, default: false },

    jobType: {
        type: String,
        enum: ['full-time', 'part-time', 'contract', 'internship', 'remote', 'hybrid'],
        required: true,
    },

    salaryRange: {
        min: { type: Number },
        max: { type: Number },
        currency: { type: String, default: 'USD' },
    },

    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
        required: true,
    },

    aboutCompany: { type: String },

    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },

    status: {
        type: String,
        enum: ['open', 'closed'],
        default: 'open'
    },

    applicants: [{
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        status: {
            type: String,
            enum: ['new', 'reviewed', 'shortlisted', 'hired', 'rejected'],
            default: 'new'
        },
        appliedAt: { type: Date, default: Date.now }
    }],

    isOpen: { type: Boolean, default: true },
}, { timestamps: true });

const Job = mongoose.model('Job', jobSchema)
module.exports = { Job }