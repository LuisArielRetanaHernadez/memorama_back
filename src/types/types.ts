import { Response } from 'express'

export type LavelGame = 'easy' | 'medium' | 'hard'
export type StatusSource = 'live' | 'update' | 'deleted'
export type CategoryGame = 'numbers' | 'animals' | 'programmation' | 'countries'

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
