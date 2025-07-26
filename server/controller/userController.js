const asyncHandler = require("express-async-handler");
const { User, Company } = require("../model/userModel");
const bcrypt = require("bcryptjs");
const { getInitials, hslToHex, getRandomOrangeBrownShade } = require("../utils/placeholderUtils");
const jwt = require("jsonwebtoken");
const { Job } = require("../model/jobModel");
const { Application } = require("../model/applicationModel");

const registerUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        if (!name || !email || !password || !role) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        if (password.length < 8 || password.length > 20) {
            return res.status(400).json({
                message: "Password must be between 8 and 20 characters",
            });
        }

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "Email already in use." });
        }

        const newUser = new User({
            name,
            email,
            password,
            role,
        });

        const initials = getInitials(name);
        const { h, s, l } = getRandomOrangeBrownShade();
        const bgColor = hslToHex(h, s, l);
        const textColor = "FFFFFF"; // white text always

        const DEFAULT_IMAGE_URL = `https://placehold.co/150x150/${bgColor}/${textColor}?text=${initials}&font=inter`;

        newUser.profile.image = DEFAULT_IMAGE_URL;

        // ✅ If employer, create company and assign
        if (role === "employer") {
            const initials = getInitials(name);
            const { h, s, l } = getRandomOrangeBrownShade();
            const bgColor = hslToHex(h, s, l);
            const textColor = "FFFFFF";

            const DEFAULT_LOGO_URL = `https://placehold.co/150x150/${bgColor}/${textColor}?text=${initials}&font=inter`;

            const company = await Company.create({
                name: `${name}'s Company`,
                description: "Edit your company description",
                location: "Not set",
                createdBy: newUser._id,
                teamMembers: [newUser._id],
                logoUrl: DEFAULT_LOGO_URL, // ✅ assign generated logo
            });

            newUser.company = company._id;
            newUser.profile = undefined; // ✅ remove profile for employer
        } else {
            const initials = getInitials(name);
            const { h, s, l } = getRandomOrangeBrownShade();
            const bgColor = hslToHex(h, s, l);
            const textColor = "FFFFFF";

            const DEFAULT_IMAGE_URL = `https://placehold.co/150x150/${bgColor}/${textColor}?text=${initials}&font=inter`;
            newUser.profile.image = DEFAULT_IMAGE_URL;
        }

        await newUser.save();

        // Token
        // const token = generateToken(newUser._id, newUser.role);

        const token = jwt.sign(
            { id: newUser._id, role: newUser.role },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN }
        );

        res.cookie("token", token, {
            path: "/",
            httpOnly: true,
            expires: new Date(Date.now() + 1000 * 86400),
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
            secure: process.env.NODE_ENV === "production",
        });

        const userPayload = {
            id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            role: newUser.role,
        };

        if (newUser.role === "jobseeker") {
            userPayload.imageUrl = newUser?.profile?.image;
        }

        res.status(201).json({
            message: "Registration successful",
            user: userPayload,
            token,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const user = await User.findOne({ email }).populate("company");

        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN }
        );

        res.cookie("token", token, {
            path: "/",
            httpOnly: true,
            expires: new Date(Date.now() + 1000 * 86400),
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
            secure: process.env.NODE_ENV === "production",
        });

        const userPayload = {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
        };

        if (user.role === "jobseeker") {
            userPayload.imageUrl = user?.profile?.image || null;
        }

        if (user.role === "employer") {
            userPayload.company = user.company || null;
        }

        res.status(200).json({
            message: "Login successful",
            user: userPayload,
            token,
        });
    } catch (err) {
        console.error("Login error:", err);
        res.status(500).json({ message: "Server error" });
    }
};

const updateProfileImage = async (req, res) => {
    try {
        const userId = req.user.id;

        if (!req.file || !req.file.path) {
            return res.status(400).json({ message: "No image uploaded" });
        }

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        user.profile.image = req.file.path;
        await user.save();

        res.status(200).json({
            message: "Profile image updated",
            imageUrl: user.profile.image,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

const updateCompanyLogo = async (req, res) => {
    try {
        const userId = req.user.id;

        if (!req.file || !req.file.path) {
            return res.status(400).json({ message: "No image uploaded" });
        }

        const user = await User.findById(userId).populate("company");

        if (!user || user.role !== "employer") {
            return res.status(403).json({ message: "Unauthorized to update logo" });
        }

        user.company.logoUrl = req.file.path;
        await user.company.save();

        res.status(200).json({
            message: "Company logo updated",
            logoUrl: user.company.logoUrl,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.user._id)
            .select("-password")
            .populate("company") // for employers
            .lean(); // returns plain JS object

        if (!user) return res.status(404).json({ message: "User not found" });

        let enrichedUser = { ...user };

        // If jobseeker, add profile info
        if (user.role === "jobseeker") {
            enrichedUser.profile = user.profile || {};
        }

        // If employer, return full company info
        if (user.role === "employer" && user.company) {
            enrichedUser.company = user.company; // already populated
        }

        res.status(200).json({ user: enrichedUser });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

const getEmployerStats = async (req, res) => {
    const employerId = req.params.id;
    const jobs = await Job.find({ createdBy: employerId });
    const applications = await Application.find({ job: { $in: jobs.map(j => j._id) } });

    const stats = {
        totalJobs: jobs.length,
        applications: applications.length,
        activeJobs: jobs.filter(j => j.status === 'Active').length,
        hires: applications.filter(a => a.status === 'Hired').length,
    };

    res.json(stats);
};

const employerDashboard = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).populate('company');
        if (!user || !user.company) {
            return res.status(400).json({ message: 'Company not found' });
        }

        // Populate nested applicants.user
        const jobs = await Job.find({ company: user.company._id })
            .populate('applicants');

        // For each job, prepare a simple summary
        const postedJobs = jobs.map(job => ({
            id: job._id,
            title: job.title,
            status: job.status,
            applicants: job.applicants.length,
            isOpen: job.isOpen,
        }));

        const recentApplicants = jobs.flatMap(job =>
            job.applicants
                .sort((a, b) => new Date(b.appliedAt) - new Date(a.appliedAt))
                .slice(0, 3)
                .filter(app => app.user) // skip unpopulated/null users
                .map(app => ({
                    id: app.user._id,
                    name: app.user.name,
                    job: job.title,
                    status: app.status,
                }))
        ).slice(0, 3);

        // Return analytics
        res.json({
            companyName: user.company.name,
            totalJobs: jobs.length,
            applications: jobs.reduce((acc, job) => acc + job.applicants.length, 0),
            activeJobs: jobs.filter(job => job.isOpen).length,
            hires: jobs.reduce((acc, job) => {
                const hiredCount = job.applicants.filter(app => app.status === 'hired').length;
                return acc + hiredCount;
            }, 0),
            postedJobs,
            recentApplicants
        });
    } catch (err) {
        console.error('Employer Dashboard Error:', err);
        res.status(500).json({ message: 'Something went wrong', error: err.message });
    }
};

const updateUser = async (req, res) => {
    try {
        const updates = req.body;
        const user = await User.findById(req.user.id);

        if (!user) return res.status(404).json({ message: "User not found" });

        const isUsingPlaceholder = user.profile?.image?.includes("placehold.co");

        if (updates.name && isUsingPlaceholder) {
            const initials = getInitials(updates.name);
            const { h, s, l } = getRandomOrangeBrownShade();
            const bgColor = hslToHex(h, s, l);
            const textColor = "FFFFFF";
            const newPlaceholderUrl = `https://placehold.co/150x150/${bgColor}/${textColor}?text=${initials}&font=inter`;

            updates["profile.image"] = newPlaceholderUrl;
        }

        // Apply updates
        Object.assign(user, updates);
        await user.save();

        const sanitizedUser = user.toObject();
        delete sanitizedUser.password;

        res.status(200).json({ message: "Profile updated", user: sanitizedUser });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

const deleteUser = asyncHandler(async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        await user.deleteOne();

        res.status(200).json({
            message: "Account and associated tasks & notifications deleted successfully",
        });
    } catch (error) {
        console.error("Error deleting user and associated data:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

const logoutUser = asyncHandler(async (req, res) => {
    try {
        const { name, email } = req.user;

        res.cookie("token", "", {
            path: "/",
            httpOnly: true,
            expires: new Date(0),
            sameSite: "none",
            secure: true,
        });

        res.status(200).json({ message: "Logout Successful" });
    } catch (error) {
        console.error("Error in logoutUser:", error.message);
        res.status(500).json({ message: "Logout failed" });
    }
});

const getEmployerAnalytics = async (req, res) => {
  try {
    const employerId = req.user.id;

    const jobs = await Job.find({ postedBy: employerId });
    const jobIds = jobs.map(job => job._id);

    const totalApplicants = await Application.countDocuments({ job: { $in: jobIds } });
    const hiresMade = await Application.countDocuments({ job: { $in: jobIds }, status: "hired" });

    const avgApplicationsPerJob = jobs.length > 0 ? (totalApplicants / jobs.length) : 0;

    res.status(200).json({
      jobsPosted: jobs.length,
      totalApplicants,
      hiresMade,
      avgApplicationsPerJob,
    });
  } catch (err) {
    console.error("Analytics error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    deleteUser,
    getUser,
    updateUser,
    updateProfileImage,
    updateCompanyLogo,
    getEmployerStats,
    employerDashboard,
    getEmployerAnalytics
}