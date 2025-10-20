import express from 'express'
import { protect } from '../middleware/auth.js'
import { generateTimetable, getTimetables } from '../controllers/timetableController.js'
const router = express.Router()
router.post('/generate', protect, generateTimetable)
router.get('/', protect, getTimetables)
export default router
