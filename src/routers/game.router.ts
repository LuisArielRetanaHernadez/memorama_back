import * as express from 'express'

// controller game
import { createGame, getGameById, searchGame } from '../controllers/game.controller'

const router = express.Router()

router.post('/', createGame)
router.get('/:id', getGameById)
// router para buscar games por la variable search en la consulta de la url
router.get('?search', searchGame)

export default router
