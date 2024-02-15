import { Response } from 'express'

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
