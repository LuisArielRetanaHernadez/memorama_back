import mongoose from 'mongoose'
import { Game } from '../types/game.types'
const { Schema } = mongoose

const gameSchema = new Schema<Game>({
  title: String,
  category: String,
  playerLimit: Number,
  isOnline: Boolean,
  isPrivate: Boolean,
  players: [{
    name: String,
    position: Number,
    socket: String
  }],
  cards: [{
    type: Schema.Types.ObjectId,
    ref: 'cards',
    isMatch: Boolean,
    player: String
  }],
  lavel: String
})

export default mongoose.model('Game', gameSchema)
