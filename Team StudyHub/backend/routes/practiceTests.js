import express from 'express'
import { protect } from '../middleware/auth.js'
import { generateTest, submitTest } from '../controllers/practiceTestController.js'
const router = express.Router()
router.post('/generate', protect, generateTest)
router.post('/:id/submit', protect, submitTest)
export default router
