import { StatusSource, LavelGame } from './types'

export interface Card {
  content: String
  pair: Number
  lavel: LavelGame
  status: StatusSource
}
