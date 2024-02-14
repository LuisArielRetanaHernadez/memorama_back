import mongoose from 'mongoose'
import { configDotenv } from 'dotenv'
configDotenv()
export const connectDB = async (): Promise<any> => {
  try {
    const conn = await mongoose.connect(process.env.BD_URL as string)
    return conn
  } catch (error) {
    console.log(error)
    return error
  }
}
