const requireApplicant = (req, res, next) => {
    if (req.user?.role !== "jobseeker") {
        return res.status(403).json({ message: "Access denied. Jobseekers only." });
    }
    next();
};

module.exports = requireApplicant;
