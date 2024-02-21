import { Socket } from 'socket.io'
import { NewGame } from '../../../types/game.types'
import gameSchema from '../../../schemas/game.schema'
// import { Player } from '../../../types/types'

export const gameMiddleware = {
  'game create': (_socket: Socket, data: NewGame, next: any) => {
    const titleValid = data.title
    if (typeof titleValid !== 'string') {
      return next(new Error('Title is not a string'))
    }
    if (titleValid.length < 0) {
      return next(new Error('Title is too short'))
    }
    const categoryValid = data.category
    if (typeof categoryValid !== 'string') {
      return next(new Error('Category is not a string'))
    }
    if (categoryValid.length < 0) {
      return next(new Error('Category is too short'))
    }
    const playerLimitValid = data.playerLimit
    if (typeof playerLimitValid !== 'number') {
      return next(new Error('Player limit is not a number'))
    }
    if (playerLimitValid < 2) {
      return next(new Error('Player limit is too low'))
    }
    if (playerLimitValid > 4) {
      return next(new Error('Player limit is too high'))
    }
    const isOnlineValid = data.isOnline
    if (typeof isOnlineValid !== 'boolean') {
      return next(new Error('Is online is not a boolean'))
    }
    const isPrivateValid = data.isPrivate
    if (typeof isPrivateValid !== 'boolean') {
      return next(new Error('Is private is not a boolean'))
    }
    if (isPrivateValid && isOnlineValid) {
      return next(new Error('Private game can only be online'))
    }
    const passwordValid = data.password
    if (typeof passwordValid !== 'string') {
      return next(new Error('Password is not a string'))
    }
    if (isPrivateValid && passwordValid.length < 6) {
      return next(new Error('Password is too short'))
    }
    const playersValid = data.players
    const playersNameValid = playersValid.some(player => typeof player.name === 'string' && player.name.length < 1)
    if (playersNameValid) {
      return next(new Error('Player name is too short and must be string'))
    }
    if (playersValid.length < 2) {
      return next(new Error('Player limit is too low'))
    }
    if (playersValid.length > playerLimitValid) {
      return next(new Error('Player limit is too high'))
    }

    return next()
  },
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
