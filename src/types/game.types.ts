import { Types } from 'mongoose'

import { LavelGame, Player } from './types'

export type PrivateGame = 'private' | 'public'
export type OnlineGame = 'online' | 'offline'
export type CategoryGame = 'numbers' | 'animals' | 'science'

export interface Game {
  title: String
  playerLimit: String
  category: CategoryGame
  isOnline: OnlineGame
  isPrivate: PrivateGame
  players: [Player]
  cards: [{
    type: Types.ObjectId
    isMatch: Boolean
    player: String
  }]
  lavel: LavelGame
}

export type NewGame = Omit<Game, 'players' | 'cards'>
export type GetGames = Omit<Game, 'players' | 'cards' | 'isOnline'>

export interface GamesPagination {
  games: GetGames[]
  page: number
  limit: number
  total: number
  next?: number
  prev?: number
}
