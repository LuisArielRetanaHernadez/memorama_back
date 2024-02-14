export type PrivateGame = 'private' | 'public'
export type OnlineGame = 'online' | 'offline'
export type CategoryGame = 'numbers' | 'animals' | 'science'
export type LavelGame = 'easy' | 'medium' | 'hard'
export type GameStatus = 'live' | 'update' | 'deleted'

export interface Game {
  title: String
  playerLimit: String
  category: CategoryGame
  isOnline: OnlineGame
  isPrivate: PrivateGame
  players: String[]
  lavel: LavelGame
}

export type NewGame = Omit<Game, 'players'>

export interface Card {
  content: String
  pair: Number
  leve: LavelGame
  status: GameStatus
}
