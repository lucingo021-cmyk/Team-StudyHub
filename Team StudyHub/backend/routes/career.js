import express from 'express'
import { protect } from '../middleware/auth.js'
import { getJobs, getJobById, applyToJob, getCompanies } from '../controllers/careerController.js'
const router = express.Router()
router.get('/jobs', protect, getJobs)
router.get('/jobs/:id', protect, getJobById)
router.post('/jobs/:id/apply', protect, applyToJob)
router.get('/companies', protect, getCompanies)
export default router
