import { Socket } from 'socket.io'
import { NewGame } from '../../../types/game.types'

export const gameMiddleware = {
  'game create': (_socket: Socket, data: NewGame, _next: any) => {
    const titleValid = data.title
    if (typeof titleValid !== 'string') {
      throw new Error('Title is not a string')
    }
    if (titleValid.length < 0) {
      throw new Error('Title is too short')
    }
    const categoryValid = data.category
    if (typeof categoryValid !== 'string') {
      throw new Error('Category is not a string')
    }
    if (categoryValid.length < 0) {
      throw new Error('Category is too short')
    }
    const playerLimitValid = data.playerLimit
    if (typeof playerLimitValid !== 'number') {
      throw new Error('Player limit is not a number')
    }
    if (playerLimitValid < 2) {
      throw new Error('Player limit is too low')
    }
    if (playerLimitValid > 4) {
      throw new Error('Player limit is too high')
    }
    const isOnlineValid = data.isOnline
    if (typeof isOnlineValid !== 'boolean') {
      throw new Error('Is online is not a boolean')
    }
    const isPrivateValid = data.isPrivate
    if (typeof isPrivateValid !== 'boolean') {
      throw new Error('Is private is not a boolean')
    }
    if (isPrivateValid && isOnlineValid) {
      throw new Error('Private game can only be online')
    }
    const passwordValid = data.password
    if (typeof passwordValid !== 'string') {
      throw new Error('Password is not a string')
    }
    if (isPrivateValid && passwordValid.length < 6) {
      throw new Error('Password is too short')
    }
    const playersValid = data.players
    const playersNameValid = playersValid.some(player => typeof player.name === 'string' && player.name.length < 1)
    if (playersNameValid) {
      throw new Error('Player name is too short and must be string')
    }
    if (playersValid.length < 2) {
      throw new Error('Player limit is too low')
    }
    if (playersValid.length > playerLimitValid) {
      throw new Error('Player limit is too high')
    }
  }
}
