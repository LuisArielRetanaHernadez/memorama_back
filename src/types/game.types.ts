import { Response } from 'express'

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

export type StatusResponse = 200 | 201 | 202 | 203 | 204 | 400 | 404
export type StatusResponseMessage = 'OK' | 'Created' | 'Accepted' | 'No Content' | 'Bad Request' | 'Not Found'

export interface ResponseJson {
  status: StatusResponseMessage
  data: Object
}

export const sendReponseJson = (
  res: Response,
  content: ResponseJson, status: StatusResponse): any => {
  return res.status(status).json(content)
}
