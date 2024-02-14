import mongoose from 'mongoose'
import { Game } from '../types/game.types'
const { Schema } = mongoose

const gameSchema = new Schema<Game>({
  title: String,
  category: String,
  playerLimit: Number,
  isOnline: Boolean,
  isPrivate: Boolean,
  players: [String],
  lavel: String
})

export default mongoose.model('Game', gameSchema)
