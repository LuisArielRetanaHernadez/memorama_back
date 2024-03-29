import { checkSchema } from 'express-validator'
import { GameLavel } from '../types/game.types'
import { Player } from '../types/types'
import { Socket } from 'net'

export const createGameSchema = checkSchema({
  title: {
    isEmpty: false,
    errorMessage: 'Title is required',
    isString: true,
    trim: true
  },
  category: {
    isString: true,
    customSanitizer: {
      options: (value) => {
        if (value === '' || value === null) {
          value = 'Sin nombre'
        }
        return true
      }
    },
    trim: true
  },
  playerLimit: {
    isNumeric: true,
    toInt: true,
    isLength: {
      options: {
        min: 2,
        max: 4
      }
    }
  },
  isOnline: {
    isBoolean: true,
    toBoolean: false
  },
  // comprobar si isOnline es true para tener la opcion de que isPrivate pueda ser true sino tendra que ser false
  isPrivate: {
    isBoolean: true,
    custom: {
      options: (value, { req }) => {
        if (value === true && req.isOnline === false) {
          throw new Error('Private game must be online')
        }
        return true
      }
    }
  },
  password: {
    optional: true,
    custom: {
      options: (value, { req }) => {
        if (value === '' && req.isPrivate === true) {
          throw new Error('Password is required')
        }
        return true
      }
    },
    trim: true,
    isLength: {
      options: {
        min: 8,
        max: 16
      }
    }
  },
  players: {
    optional: true,
    custom: {
      options: (value: Player[], { req }) => {
        if (value.length <= 0) {
          throw new Error('Players is required')
        }
        if (value.length > req.playerLimit) {
          throw new Error('Players limit exceeded')
        }
        const players = value.some(player => player.name === '' || typeof player.name === 'string')
        if (players) {
          throw new Error('Players name is required')
        }
        return true
      }
    }
  },
  'players.*.password': {
    optional: true,
    custom: {
      options: (value, { req }) => {
        if (value === '' && req.body.isPrivate === true) {
          throw new Error('Password is required')
        }
        return true
      }
    },
    trim: true
  },
  lavel: {
    isString: true,
    customSanitizer: {
      options: (value: GameLavel) => {
        if (!['easy', 'medium', 'hard'].includes(value)) {
          throw new Error('Level must be easy, medium or hard')
        }
        return true
      }
    }
  }
})
