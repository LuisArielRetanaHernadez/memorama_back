import mongoose from 'mongoose'
import { Card } from '../types/card.types'
const { Schema } = mongoose

const cardSchema = new Schema<Card>({
  content: String,
  pair: Number,
  lavel: String,
  category: String,
  status: String
})

export default mongoose.model('Game', cardSchema)
