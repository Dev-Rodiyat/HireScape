const express = require("express");
const router = express.Router();
const { registerUser, loginUser, logoutUser, getUser, deleteUser, updateUser, updateProfileImage, updateCompanyLogo, getEmployerStats, employerDashboard, getEmployerAnalytics } = require("../controller/userController");
const { protectUser } = require("../middleware/authMiddleware");
const upload = require("../middleware/cloudinaryUploader");
const requireEmployer = require("../middleware/requireEmployer");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", protectUser, logoutUser);
router.get("/get-user", protectUser, getUser);
router.put('/update-user', protectUser, updateUser);
router.delete("/delete-user", protectUser, deleteUser);
router.put("/upload-image", protectUser, upload.single("image"), updateProfileImage);
router.put("/upload-logo", protectUser, requireEmployer, upload.single("logo"), updateCompanyLogo);
router.get("/dashboard", protectUser, requireEmployer, employerDashboard);
router.get("/analytics", protectUser, requireEmployer, getEmployerAnalytics);

router.get('/:id/stats', getEmployerStats);
// router.get('/:id/jobs', getEmployerJobs);
// router.get('/:id/recent-applicants', getRecentApplicants);




module.exports = router;