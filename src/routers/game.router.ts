import * as express from 'express'

// controller game
import { createGame, getGameById } from '../controllers/game.controller'

const router = express.Router()

router.post('/', createGame)
router.get('/:id', getGameById)

export default router
