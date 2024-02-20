import * as express from 'express'

// controller game
import { createGame, getGame, getGameById, searchGame } from '../controllers/game.controller'
import { createGameSchema } from '../middlewares/gameBody.middleware'
import { validate } from '../middlewares/validate.middleware'

const router = express.Router()

router.post('/', validate(createGameSchema), createGame)
router.get('/', getGame)
router.get('/id/:id', getGameById)
router.get('/search', searchGame)

export default router
