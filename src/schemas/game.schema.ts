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
  matchsCards: [{
    pair: {
      type: Number
    },
    player: {
      type: String
    }
  }],
  cards: [{
    _id: {
      type: Schema.Types.ObjectId,
      ref: 'Card'
    },
    isFlip: {
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
