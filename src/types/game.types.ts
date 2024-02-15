import { Types } from 'mongoose'

import { LavelGame } from './types'

export type PrivateGame = 'private' | 'public'
export type OnlineGame = 'online' | 'offline'
export type CategoryGame = 'numbers' | 'animals' | 'science'

export interface Game {
  title: String
  playerLimit: String
  category: CategoryGame
  isOnline: OnlineGame
  isPrivate: PrivateGame
  players: String[]
  cards: [{
    type: Types.ObjectId
    ref: 'cards'
    isMatch: Boolean
    player: String
  }]
  lavel: LavelGame
}

export type NewGame = Omit<Game, 'players'>
