import * as express from 'express'

// controller game
import { createGame, getGame, getGameById, searchGame } from '../controllers/game.controller'

const router = express.Router()

router.post('/', createGame)
router.get('/game?limit=&page=', getGame)
router.get('/:id', getGameById)
router.get('/game?search', searchGame)

export default router
