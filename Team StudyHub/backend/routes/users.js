import express from 'express'
import { protect } from '../middleware/auth.js'
import { updateProfile, getUsers } from '../controllers/userController.js'
const router = express.Router()
router.get('/', protect, getUsers)
router.put('/', protect, updateProfile)
export default router
