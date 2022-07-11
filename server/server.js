import cookieParser from 'cookie-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import 'dotenv/config'
import express, { json, urlencoded } from 'express'
import { fileURLToPath } from 'url'
import './models/mongo/db.js'
import QuestionRouter from './routers/mongo/question.router.js'
import result from './routers/mongo/result.router.js'
import CandidatesRouter from './routers/mysql/Candidates.js'
import ExamGroupRouter from './routers/mysql/ExamGroup.js'
import { router } from './routers/mysql/index.js'
import QuestionGroupRouter from './routers/mysql/questionGroup.routers.js'
import StatisticRouter from './routers/mysql/Statistic.js'
import SubExamGroupRouter from './routers/mysql/SubExamGroup.js'
import Users from './routers/mysql/Users.js'

import path from 'path'
const app = express()
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
dotenv.config({ path: path.resolve(__dirname, '../.env') })
const corsOptions = {
  credentials: true,
  origin: 'http://localhost:3000',
}

app.use(cookieParser())
app.use(cors(corsOptions))
app.use(json())
app.use(urlencoded({ extended: true }))

app.use(QuestionGroupRouter)
app.use(QuestionRouter)
app.use(ExamGroupRouter)
app.use(SubExamGroupRouter)
app.use(result)
app.use(StatisticRouter)
app.use(CandidatesRouter)
app.use(Users)

router(app)

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')))

  app.get('*', (req, res) => {
    res.sendFile(__dirname, '../', 'client', 'build', 'index.html')
  })
} else {
  app.get('/', (req, res) => {
    res.status(200).json({ message: 'welcome' })
  })
}

const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`)
})
