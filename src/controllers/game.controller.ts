import tryCatch from '../utils/tryCatch'

import { Request, Response, NextFunction } from 'express'

// service
import { addGame, getGameByIdService } from '../service/gameService'
import { ResponseJson, StatusResponse, sendReponseJson } from '../types/types'
import TemplateError from '../utils/templateError'

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

export const getGameById = tryCatch(async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const gameFind = await getGameByIdService(req.params.id)
  let statusResponse: StatusResponse = 200

  if (gameFind.length === 0) {
    statusResponse = 404
    return next(new TemplateError('not found Game', statusResponse))
  }

  const responseData: ResponseJson = {
    status: 'OK',
    data: gameFind
  }

  return sendReponseJson(res, responseData, statusResponse)
})
