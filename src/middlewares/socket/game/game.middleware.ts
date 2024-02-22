import { Socket } from 'socket.io'
import gameSchema from '../../../schemas/game.schema'
// import { Player } from '../../../types/types'

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
  }
}
