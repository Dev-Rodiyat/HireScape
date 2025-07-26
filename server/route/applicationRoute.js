const express = require("express");
const router = express.Router();
const { protectUser } = require("../middleware/authMiddleware");
const requireApplicant = require("../middleware/requireApplicant");
const { applyForJob, getUserApplications, getSavedJobs, getResumeStatus, getProfileCompletion, toggleSaveJob } = require("../controller/applicationController");
const upload = require("../middleware/cloudinaryUploader");

router.post("/apply", protectUser, requireApplicant, upload.single("resume"), applyForJob);
router.get("/get-my-applications", protectUser, requireApplicant, getUserApplications);
router.get("/get-saved-jobs", protectUser, requireApplicant, getSavedJobs);
router.get("/resume", protectUser, requireApplicant, getResumeStatus);
router.get("/profile-completion", protectUser, requireApplicant, getProfileCompletion);
router.put("/toggle-save-job/:jobId", protectUser, requireApplicant, toggleSaveJob);

module.exports = router;