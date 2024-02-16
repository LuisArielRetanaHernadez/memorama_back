import tryCatch from '../utils/tryCatch'

import { Request, Response, NextFunction } from 'express'

// service
import { addGame, enterTheGameService, getGameByIdService, getGamesService, searchGameService } from '../service/gameService'
import { ResponseJson, StatusResponse, sendReponseJson } from '../types/types'
import TemplateError from '../utils/templateError'

export const getGame = tryCatch(async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const { limit, page } = req.query

  if (limit === undefined || page === undefined) {
    return next(new TemplateError('limit or page is undefined', 400))
  }

  const games = await getGamesService(+limit, +page)

  if (games.length <= 0) {
    return next(new TemplateError('not found Games', 404))
  }

  const responseData: ResponseJson = {
    status: 'OK',
    data: games
  }

  return sendReponseJson(res, responseData, 200)
})

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

export const enterTheGame = tryCatch(async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const { player } = req.body
  const { id } = req.params

  const matchGame = await enterTheGameService(id, player)

  if (!matchGame) {
    return next(new TemplateError('not found Game', 404))
  }

  const responseData: ResponseJson = {
    status: 'OK',
    data: matchGame
  }

  return sendReponseJson(res, responseData, 200)
})

export const searchGame = tryCatch(async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const { searchGame } = req.query

  const games = await searchGameService(searchGame as String)

  if (games == null) {
    return next(new TemplateError('not found Game', 404))
  }

  const responseData: ResponseJson = {
    status: 'OK',
    data: games
  }

  return sendReponseJson(res, responseData, 200)
})
