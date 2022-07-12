import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

const DATABASE_URL = process.env.DATABASE_URL

export async function connectDB() {
  if (!DATABASE_URL) {
    console.error('No DATABASE_URL specified')
    return
  }
  try {
    mongoose.connect(DATABASE_URL)
    console.log('MongoDB connected')
  } catch (error) {
    console.error((error as Error).message)
    process.exit(1)
  }
}