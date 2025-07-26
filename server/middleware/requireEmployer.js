const requireEmployer = (req, res, next) => {
    if (req.user?.role !== "employer") {
        return res.status(403).json({ message: "Access denied. Employers only." });
    }
    next();
};

module.exports = requireEmployer;
