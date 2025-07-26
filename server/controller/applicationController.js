const { Application } = require("../model/applicationModel");
const { Job } = require("../model/jobModel");
const { User } = require("../model/userModel");
const cloudinary = require("cloudinary").v2;

const applyForJob = async (req, res) => {
    try {
        const userId = req.user.id;
        const { jobId, coverLetter } = req.body;

        // Validate resume
        if (!req.file || !req.file.path) {
            return res.status(400).json({ message: "No resume file uploaded" });
        }

        const job = await Job.findById(jobId);
        if (!job || !job.isOpen) {
            return res.status(404).json({ message: "Job not found or is closed" });
        }

        const alreadyApplied = await Application.findOne({
            job: jobId,
            applicant: userId,
        });

        if (alreadyApplied) {
            return res.status(400).json({ message: "You have already applied for this job" });
        }

        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: "resumes",
            resource_type: "raw",
        });

        const newApplication = new Application({
            job: jobId,
            applicant: userId,
            resumeUrl: result.secure_url,
            coverLetter,
        });

        await newApplication.save();

        await User.findByIdAndUpdate(userId, {
            $addToSet: { applications: newApplication._id }
        });

        await Job.findByIdAndUpdate(jobId, {
            $addToSet: { applicants: userId }
        });

        res.status(201).json({
            message: "Application submitted successfully",
            application: newApplication,
        });

    } catch (err) {
        console.error("Error applying for job:", err);
        res.status(500).json({ message: "Server error" });
    }
};

const getUserApplications = async (req, res) => {
    try {
        const userId = req.user.id;

        const applications = await Application.find({ applicant: userId })
            .populate({
                path: "job",
                select: "title company",
                populate: {
                    path: "company",
                    select: "name location email",
                },
            })
            .sort({ createdAt: -1 });

        res.status(200).json(applications);
    } catch (err) {
        console.error("Error fetching user applications:", err);
        res.status(500).json({ message: "Server error" });
    }
};

const getSavedJobs = async (req, res) => {
    try {
        const userId = req.user.id;

        const user = await User.findById(userId).populate({
            path: "savedJobs",
            select: "title company location type createdAt",
            populate: {
                path: "company",
                select: "name location logoUrl", // Include other fields you need
            },
        });

        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        res.status(200).json(user.savedJobs);
    } catch (error) {
        console.error("Error fetching saved jobs:", error);
        res.status(500).json({ message: "Failed to fetch saved jobs." });
    }
};

const toggleSaveJob = async (req, res) => {
    try {
        const userId = req.user.id;
        const jobId = req.params.jobId;

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        const isAlreadySaved = user.savedJobs.includes(jobId);

        if (isAlreadySaved) {
            // Unsave job
            user.savedJobs = user.savedJobs.filter(id => id.toString() !== jobId);
            await user.save();
            return res.status(200).json({ saved: false, message: "Job unsaved." });
        } else {
            // Save job
            user.savedJobs.push(jobId);
            await user.save();
            return res.status(200).json({ saved: true, message: "Job saved." });
        }
    } catch (error) {
        console.error("Error toggling saved job:", error);
        res.status(500).json({ message: "Failed to toggle saved job." });
    }
};

const getResumeStatus = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("resume");

        const uploaded = !!user?.resume;

        res.status(200).json({ uploaded });
    } catch (error) {
        console.error("Error fetching resume status:", error);
        res.status(500).json({ message: "Failed to fetch resume status" });
    }
};

const getProfileCompletion = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).lean();

        let totalFields = 5;
        let filled = 0;

        if (user.name) filled++;
        if (user.email) filled++;
        if (user.resume) filled++;
        if (user.bio) filled++;
        if (user.skills?.length) filled++;

        const completion = Math.round((filled / totalFields) * 100);

        res.status(200).json({ completion });
    } catch (error) {
        console.error("Error checking profile completion:", error);
        res.status(500).json({ message: "Failed to fetch profile completion" });
    }
};

module.exports = {
    applyForJob,
    getUserApplications,
    getSavedJobs,
    getResumeStatus,
    getProfileCompletion,
    toggleSaveJob
};
