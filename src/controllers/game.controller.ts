import tryCatch from '../utils/tryCatch'
import TemplateError from '../utils/templateError'

import { Request, Response, NextFunction } from 'express'

// service
import { addGame } from '../service/gameService'
import { ResponseJson, StatusResponse } from '../types/game.types'

export const createGame = tryCatch(async (req: Request, res: Response, next: NextFunction) => {
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

  const responseJson: ResponseJson = {
    status: 'Created',
    data: game
  }

  const statusReponse: StatusResponse = 201

  res.status(statusReponse).json(responseJson)
})
