import express from 'express'
import routerGame from './src/routers/game.router'
import sendError from './src/utils/error'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/v1/game', routerGame)
app.use(sendError)

export default app
