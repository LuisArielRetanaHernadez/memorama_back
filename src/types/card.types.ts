import { StatusSource, LavelGame } from './types'

export interface Card {
  content: String
  pair: Number
  leve: LavelGame
  status: StatusSource
}
