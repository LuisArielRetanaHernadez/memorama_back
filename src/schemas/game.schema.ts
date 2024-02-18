import mongoose from 'mongoose'
import { Game } from '../types/game.types'
const { Schema } = mongoose

const gameSchema = new Schema<Game>({
  title: String,
  category: String,
  playerLimit: Number,
  isOnline: Boolean,
  isPrivate: Boolean,
  password: String,
  players: [{
    name: {
      type: String
    },
    position: {
      type: Number
    },
    socket: {
      type: String
    }
  }],
  cards: [{
    isMatch: {
      type: Boolean,
      default: false
    },
    player: {
      type: String,
      default: ''
    }
  }],
  lavel: String
})

export default mongoose.model('Game', gameSchema)
