import express from 'express'
import { protect } from '../middleware/auth.js'
import { sendMessage } from '../controllers/chatController.js'
const router = express.Router()
router.post('/:chatId/messages', protect, sendMessage)
export default router
