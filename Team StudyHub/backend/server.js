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

// CORS configuration
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    const allowedOrigins = [
      process.env.CLIENT_URL || 'http://localhost:3000',
      'http://localhost:3000',
      'https://your-production-domain.com' // Add your production domain here
    ];
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions))

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
const HOST = process.env.HOST || '0.0.0.0'

app.listen(PORT, HOST, ()=>{
  console.log(`[${process.env.NODE_ENV || 'development'}] Server running on ${HOST}:${PORT}`)
  console.log(`[${process.env.NODE_ENV || 'development'}] Health check: http://${HOST}:${PORT}/api/health`)
})