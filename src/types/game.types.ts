import { Types } from 'mongoose'

import { Player } from './types'

export type PrivateGame = 'private' | 'public'
export type GameLavel = 'easy' | 'medium' | 'hard'
export type GameCategory = 'numbers' | 'animals' | 'programmation' | 'countries'
export type GameStatus = 'waiting' | 'started' | 'finished'
export type OnlineGame = 'online' | 'offline'
export type CategoryGame = 'numbers' | 'animals' | 'science'

export interface Game {
  title: String
  category: CategoryGame
  isOnline: Boolean
  isPrivate: Boolean
  password?: String
  playerLimit: String
  players: Player[]
  limitCards: number
  cards: [{
    type: Types.ObjectId
    ref: 'cards'
    isFlip: Boolean
  }]
  matchsCards: [{ pair: number, player: string }]
  lavel: GameLavel
  status: GameStatus
}

export type NewGame = Omit<Game, 'cards' | 'matchsCards'>
export type GetGames = Omit<Game, 'players' | 'cards' | 'isOnline'>

export interface GamesPagination {
  games: GetGames[]
  page: number
  limitSource: number
  totalPages: number
  nextPage?: number
  prevPage?: number
}
