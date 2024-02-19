import { StatusSource, GameLavel, GameCategory } from './types'

export interface Card {
  content: String
  pair: Number
  lavel: GameLavel
  category: GameCategory
  status: StatusSource
}
