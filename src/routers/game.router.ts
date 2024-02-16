import * as express from 'express'

// controller game
import { createGame, getGameById, searchGame } from '../controllers/game.controller'

const router = express.Router()

router.post('/', createGame)
router.get('/:id', getGameById)
router.get('?search', searchGame)

export default router
