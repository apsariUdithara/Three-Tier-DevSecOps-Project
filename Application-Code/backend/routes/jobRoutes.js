import express from 'express';
import { 
    createJob, 
    getJobs, 
    getJobsByUser,
    searchJobs,
    applyJob,
    likeJob,
    getJobById,
    deleteJob

} from '../controllers/jobController.js';
import protect from '../middleware/protect.js';

const router = express.Router();

router.post('/jobs',protect, createJob);
router.get("/jobs", getJobs);
router.get("/jobs/user/:id", protect, getJobsByUser);
router.get("/jobs/search", searchJobs);   // search jobs
router.put("/jobs/apply/:id", protect, applyJob);  // apply for job
router.put("/jobs/like/:id", protect, likeJob);  // like job and unlike job
router.get("/jobs/:id", protect, getJobById); //get job by id
router.delete("/jobs/:id", protect, deleteJob); //delete job

export default router;