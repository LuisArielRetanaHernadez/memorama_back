import mongoose from 'mongoose'
import { Game } from '../types/game.types'
const { Schema } = mongoose

const gameSchema = new Schema<Game>({
  title: String,
  category: String,
  isOnline: Boolean,
  isPrivate: Boolean,
  password: String,
  administrator: {
    name: String,
    position: Number,
    socket: String
  },
  playerLimit: Number,
  players: [{
    name: {
      type: String
    },
    isShift: {
      type: Boolean,
      default: false
    },
    shift: Number,
    position: {
      type: Number
    },
    socket: {
      type: String
    }
  }],
  limitCards: String,
  cards: [{
    _id: {
      type: Schema.Types.ObjectId,
      ref: 'Card'
    },
    isFlip: {
      type: Boolean,
      default: false
    },
    isMatched: {
      type: Boolean,
      default: false
    }
  }],
  lavel: String,
  status: {
    type: String,
    default: 'waiting'
  }
})

export default mongoose.model('Game', gameSchema)
