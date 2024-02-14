import * as express from 'express'

// controller game
import { createGame } from '../controllers/game.controller'

const router = express.Router()

// router.get('/', (req, res) => {})
router.post('/', createGame)
// router.get('/:id', (req, res) => {})

export default router
