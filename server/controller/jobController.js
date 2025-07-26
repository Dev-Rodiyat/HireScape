const { Application } = require("../model/applicationModel");
const { Job } = require("../model/jobModel");
const { Company } = require("../model/userModel");

const createJob = async (req, res) => {
    try {
        const user = req.user;

        const company = await Company.findOne({ createdBy: user.id });
        if (!company) {
            return res.status(400).json({ message: 'Employer has no associated company.' });
        }

        const {
            title,
            description,
            location,
            remote,
            jobType,
            salaryRange,
        } = req.body;

        if (!title || !description || !jobType) {
            return res.status(400).json({ message: 'Title, description, and job type are required' });
        }

        const jobSummary = description.length > 150
            ? description.substring(0, 150) + '...'
            : description;

        const newJob = await Job.create({
            title,
            description,
            jobSummary,                         // ✅ summary for listing previews
            aboutCompany: company.description,  // ✅ snapshot of company info
            location,
            remote,
            jobType,
            salaryRange,
            company: company._id,
            postedBy: user.id,
        });

        // Optionally: push job to company's jobs array
        company.jobs.push(newJob._id);
        await company.save();

        res.status(201).json({
            message: 'Job created successfully',
            job: newJob,
        });
    } catch (err) {
        console.error('Job creation error:', err);
        res.status(500).json({ message: 'Server error' });
    }
};

const getAllJobs = async (req, res) => {
    try {
        const jobs = await Job.find({ isOpen: true })
            .populate('company', 'name logoUrl location')
            .sort({ createdAt: -1 });

        res.status(200).json(jobs);
    } catch (err) {
        console.error('Get all jobs error:', err);
        res.status(500).json({ message: 'Server error' });
    }
};

const getJobsCreatedByUser = async (req, res) => {
    try {
        const { userId } = req.params;

        const jobs = await Job.find({ postedBy: userId })
            .populate("company", "name logoUrl")
            .sort({ createdAt: -1 });

        res.status(200).json({ jobs });
    } catch (error) {
        console.error("Error fetching jobs by user:", error);
        res.status(500).json({ message: "Server error" });
    }
};

const getJobDetails = async (req, res) => {
    try {
        const { jobId } = req.params;

        const job = await Job.findById(jobId)
            .populate('company', 'name logoUrl location description')
            .populate('postedBy', 'name email');

        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }

        res.status(200).json(job);
    } catch (err) {
        console.error('Get job details error:', err);
        res.status(500).json({ message: 'Server error' });
    }
};

const getJobsByCompany = async (req, res) => {
    try {
        const { companyId } = req.params;

        const jobs = await Job.find({ company: companyId })
            .populate("postedBy", "name email")
            .sort({ createdAt: -1 });

        res.status(200).json({ jobs });
    } catch (error) {
        console.error("Error fetching jobs by company:", error);
        res.status(500).json({ message: "Server error" });
    }
};

const getApplicationsForJob = async (req, res) => {
  try {
    const userId = req.user.id;
    const { jobId } = req.params;

    const job = await Job.findById(jobId).populate("company");
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    if (String(job.postedBy) !== String(userId)) {
      return res.status(403).json({ message: 'You are not authorized to view applications for this job' });
    }

    const applications = await Application.find({ job: jobId })
      .populate({
        path: 'applicant',
        select: 'name email profile',
      })
      .sort({ createdAt: -1 });

    res.status(200).json({
      jobTitle: job.title,
      totalApplications: applications.length,
      applications,
    });

  } catch (err) {
    console.error('Error fetching applications:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

const updateJob = async (req, res) => {
    try {
        const { jobId } = req.params;
        const updates = req.body;

        const job = await Job.findById(jobId);

        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }

        if (job.postedBy.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Not authorized to update this job' });
        }

        Object.assign(job, updates);
        const updatedJob = await job.save();

        res.status(200).json({
            message: 'Job updated successfully',
            job: updatedJob,
        });
    } catch (err) {
        console.error('Update job error:', err);
        res.status(500).json({ message: 'Server error' });
    }
};

const deleteJob = async (req, res) => {
    try {
        const { jobId } = req.params;

        const job = await Job.findById(jobId);

        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }

        // Only employer who posted the job can delete
        if (job.postedBy.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Not authorized to delete this job' });
        }

        await job.deleteOne();

        res.status(200).json({ message: 'Job deleted successfully' });
    } catch (err) {
        console.error('Delete job error:', err);
        res.status(500).json({ message: 'Server error' });
    }
};

const updateApplicationStatus = async (req, res) => {
    try {
        const { applicationId } = req.params;
        const { status } = req.body;

        const application = await Application.findById(applicationId).populate("job");
        if (!application) return res.status(404).json({ message: "Application not found" });

        // Check if current user is the employer who posted the job
        if (String(application.job.postedBy) !== req.user.id) {
            return res.status(403).json({ message: "Only the job poster can update status" });
        }

        application.status = status;
        await application.save();

        res.status(200).json({
            message: "Application status updated",
            application,
        });
    } catch (err) {
        console.error("Error updating application:", err);
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = { createJob, getAllJobs, getJobsCreatedByUser, getJobDetails, getJobsByCompany, updateJob, deleteJob, getApplicationsForJob, updateApplicationStatus };
