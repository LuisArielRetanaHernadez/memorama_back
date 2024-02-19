import { GameLavel, GameCategory } from './game.types'
import { StatusSource } from './types'

export interface Card {
  content: String
  pair: Number
  lavel: GameLavel
  category: GameCategory
  status: StatusSource
}
