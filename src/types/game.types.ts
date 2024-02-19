import { Types } from 'mongoose'

import { Player } from './types'

export type PrivateGame = 'private' | 'public'
export type GameLavel = 'easy' | 'medium' | 'hard'
export type StatusSource = 'live' | 'update' | 'deleted'
export type GameCategory = 'numbers' | 'animals' | 'programmation' | 'countries'

export type OnlineGame = 'online' | 'offline'
export type CategoryGame = 'numbers' | 'animals' | 'science'

export interface Game {
  title: String
  playerLimit: String
  limitCards: number
  category: CategoryGame
  isOnline: Boolean
  isPrivate: Boolean
  password?: String
  players: [Player]
  cards: [{
    type: Types.ObjectId
  }]
  matchsCards: [{
    pair: number
    player: string
  }]
  lavel: GameLavel
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
