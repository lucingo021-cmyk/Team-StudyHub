import express from 'express'
import { protect } from '../middleware/auth.js'
import { getDocuments, uploadDocument, deleteDocument } from '../controllers/documentController.js'
const router = express.Router()
router.get('/', protect, getDocuments)
router.post('/', protect, uploadDocument)
router.delete('/:id', protect, deleteDocument)
export default router
