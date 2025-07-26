const express = require('express');
const { protectUser } = require('../middleware/authMiddleware');
const requireEmployer = require('../middleware/requireEmployer');
const { createJob, getAllJobs, getJobDetails, updateJob, deleteJob, getJobsByUser, getJobsCreatedByUser, getJobsByCompany, getApplicationsForJob, updateApplicationStatus } = require('../controller/jobController');
const router = express.Router();

router.post('/create-job', protectUser, requireEmployer, createJob);
router.get('/get-all-jobs', getAllJobs);
router.get('/get-job/:jobId', getJobDetails);
router.put('/update-job/:jobId', protectUser, requireEmployer, updateJob);
router.delete('/delete-job/:jobId', protectUser, requireEmployer, deleteJob);
router.get('/get-applications-for-job/:jobId', protectUser, getApplicationsForJob);
router.put('/update-applications-for-job/:jobId', protectUser, requireEmployer, updateApplicationStatus);
router.get("/created-by/:userId", protectUser, getJobsCreatedByUser);
router.get("/company/:companyId", protectUser, getJobsByCompany);

module.exports = router;
