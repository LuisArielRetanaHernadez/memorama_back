import { StatusSource, LavelGame, CategoryGame } from './types'

export interface Card {
  content: String
  pair: Number
  lavel: LavelGame
  category: CategoryGame
  status: StatusSource
}
