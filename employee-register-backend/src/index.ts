import express from 'express'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import api from '@app/routers'
import { connectDB } from './db'

dotenv.config()



const app = express()

const PORT = process.env['PORT'] || 3000
connectDB()
app.use(express.json())

app.use(bodyParser.urlencoded({ extended: true }))
app.use('/api/v1', api)


app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
})