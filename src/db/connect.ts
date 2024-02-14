import mongoose from 'mongoose'

// dotenv
import { configDotenv } from 'dotenv'
configDotenv({ path: './.development.env' })

export const connectDB = async (): Promise<any> => {
  try {
    const conn = await mongoose.connect(process.env.DB_URL as string)
    return conn
  } catch (error) {
    console.log(error)
    return error
  }
}
