import tryCatch from '../utils/tryCatch'

import { Request, Response, NextFunction } from 'express'

// service
import { addGame } from '../service/gameService'
import { ResponseJson, StatusResponse, sendReponseJson } from '../types/types'

export const createGame = tryCatch(async (req: Request, res: Response, _next: NextFunction): Promise<any> => {
  const {
    title,
    category,
    playerLimit,
    isOnline,
    isPrivate,
    lavel
  } = req.body

  const game = await addGame({
    title,
    category,
    playerLimit,
    isOnline,
    isPrivate,
    lavel
  })

  const responseData: ResponseJson = {
    status: 'Created',
    data: game
  }

  const statusResponse: StatusResponse = 201

  const reponseSedn = sendReponseJson(res, responseData, statusResponse)

  return reponseSedn
})

export const getGameById = tryCatch(async (_req: Request, res: Response, _next: NextFunction): Promise<any> => {
  return res.status(200).json({})
})
