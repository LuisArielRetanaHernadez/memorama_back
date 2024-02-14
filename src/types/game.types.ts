export type PrivateGame = 'private' | 'public'
export type OnlineGame = 'online' | 'offline'
export type CategoryGame = 'numbers' | 'animals' | 'science'
export type LavelGame = 'easy' | 'medium' | 'hard'

export interface Game {
  title: string
  playerLimit: string
  category: CategoryGame
  isOnline: OnlineGame
  isPrivate: PrivateGame
  players: string[]
  lavel: LavelGame
}

export type NewGame = Omit<Game, 'players'>
