import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import authRoutes from './routes/auth.js'
import usersRoutes from './routes/users.js'
import documentsRoutes from './routes/documents.js'
import timetableRoutes from './routes/timetable.js'
import practiceTestsRoutes from './routes/practiceTests.js'
import careerRoutes from './routes/career.js'
import chatRoutes from './routes/chat.js'
import { errorHandler } from './middleware/errorHandler.js'

dotenv.config()

const app = express()
app.use(helmet())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:3000' }))

app.get('/api/health', (req,res)=>{
  res.json({ status: 'OK', message: 'Study Hub API is running' })
})

app.use('/api/auth', authRoutes)
app.use('/api/users', usersRoutes)
app.use('/api/documents', documentsRoutes)
app.use('/api/timetable', timetableRoutes)
app.use('/api/practice-tests', practiceTestsRoutes)
app.use('/api/career', careerRoutes)
app.use('/api/chat', chatRoutes)

app.use(errorHandler)

const PORT = process.env.PORT || 5000
app.listen(PORT, ()=>{
  console.log(`[local] Server running on port ${PORT}`)
})
