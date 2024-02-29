import { Socket } from 'socket.io'
import gameSchema from '../../../schemas/game.schema'
// import { Player } from '../../../types/types'

// jsonwebtoken
import jwt from 'jsonwebtoken'

export const gameMiddleware = {
  'game join': async (_socket: Socket, data: any, next: any) => {
    const id = data.id
    console.log('join game ', data)
    if (typeof id !== 'string' && id === undefined) {
      return next(new Error('Id is not a string'))
    }
    const gameFind = await gameSchema.findOne({ _id: id })
    if (gameFind === null) {
      return next(new Error('Game not found'))
    }

    if (+gameFind.playerLimit === gameFind.players.length) {
      return next(new Error('Game is full'))
    }

    const socketsRedundacy = gameFind.players.some((player) => {
      return player.socket === data.socket
    })

    if (socketsRedundacy) {
      return next(new Error('Player already in game'))
    }

    data.position = gameFind.players.length + 1
    return next()
  },
  shift: async (socket: Socket, data: any, next: any) => {
    const token = socket.handshake.auth.token
    const idUser = socket.handshake.query.user
    const idGame = socket.handshake.query.game
    if (token === undefined) {
      return next(new Error('User not found'))
    }
    const veryToken = jwt.verify(token, process.env.JWT_SECRET as string)
    if (veryToken === undefined) {
      return next(new Error('User not found'))
    }

    const game = await gameSchema.findOne({ _id: idGame, 'players._id': idUser })
    if (game === null) {
      return next(new Error('Game not found'))
    }

    // extraer el user del game
    const user = game.players.find((player) => player._id === idUser)
    if (user?.isShift === false) {
      return next(new Error('User already shift'))
    }
    return next()
  }
}
