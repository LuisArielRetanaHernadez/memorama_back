import mongoose from 'mongoose'

export const connectDB = async (): Promise<any> => {
  try {
    const conn = await mongoose.connect('.....')
    return conn
  } catch (error) {
    console.log(error)
    return error
  }
}
