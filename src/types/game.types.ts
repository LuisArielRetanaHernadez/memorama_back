import { Types } from 'mongoose'

import { LavelGame, Player } from './types'

export type PrivateGame = 'private' | 'public'
export type OnlineGame = 'online' | 'offline'
export type CategoryGame = 'numbers' | 'animals' | 'science'

export interface Game {
  title: String
  playerLimit: String
  limitCards: number
  category: CategoryGame
  isOnline: Boolean
  isPrivate: Boolean
  players: [Player]
  cards: [{
    type: Types.ObjectId
  }]
  matchsCards: [{
    pair: number
    player: string
  }]
  lavel: LavelGame
}

export type NewGame = Omit<Game, 'players' | 'cards' | 'matchsCards'>
export type GetGames = Omit<Game, 'players' | 'cards' | 'isOnline'>

export interface GamesPagination {
  games: GetGames[]
  page: number
  limit: number
  total: number
  next?: number
  prev?: number
}
