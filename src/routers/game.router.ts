import * as express from 'express'

// controller game
import { createGame, getGame, getGameById, searchGame } from '../controllers/game.controller'

const router = express.Router()

router.post('/', createGame)
router.get('/', getGame)
router.get('/id/:id', getGameById)
router.get('/search', searchGame)

export default router
