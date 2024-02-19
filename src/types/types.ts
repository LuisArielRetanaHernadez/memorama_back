import { SocketType } from 'dgram'
import { Response } from 'express'

export type StatusSource = 'live' | 'update' | 'deleted'
export type StatusResponse = 200 | 201 | 202 | 203 | 204 | 400 | 404
export type StatusResponseMessage = 'OK' | 'Created' | 'Accepted' | 'No Content' | 'Bad Request' | 'Not Found'

export interface ResponseJson {
  status: StatusResponseMessage
  data: Object
  page?: number
  limit?: number
  pages?: number
  next?: number | null
}

export const sendReponseJson = (
  res: Response,
  content: ResponseJson, status: StatusResponse): any => {
  return res.status(status).json(content)
}

export interface Player {
  name: string
  position: number
  socket?: SocketType
  password?: string
}
