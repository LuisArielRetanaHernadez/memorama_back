import { checkSchema } from 'express-validator'
import { GameLavel } from '../types/game.types'
import { Player } from '../types/types'

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
          throw new Error('Category is required')
        }
        return value
      }
    },
    trim: true
  },
  playerLimit: {
    isNumeric: true,
    errorMessage: 'Player limit is required',
    toInt: true
  },
  isOnline: {
    isBoolean: true
  },
  // isPrivate: {
  //   isBoolean: true,
  //   custom: {
  //     options: (value, { req }) => {
  //       if (value === true && req.body.isOnline === false) {
  //         throw new Error('Private game must be online')
  //       }
  //       return value
  //     }
  //   },
  //   customSanitizer: {
  //     options: (value, { req }) => {
  //       if (value === true && req.body.isOnline === false) {
  //         return false
  //       }
  //       return value
  //     }
  //   }
  // },
  password: {
    optional: true,
    custom: {
      options: (value, { req }) => {
        if (value === '' && req.isPrivate === true) {
          throw new Error('Password is required')
        }
        return value
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
    isEmpty: false,
    errorMessage: 'Players is required',
    custom: {
      options: (value: Player[], { req }) => {
        console.log(value)
        if (value === undefined) {
          throw new Error('Players is required')
        }
        if (value.length <= 0) {
          throw new Error('Players is required')
        }
        if (value.length > req.playerLimit) {
          throw new Error('Players limit exceeded')
        }
        const players = value.some(player => player.name === '' || typeof player.name !== 'string')
        console.log(players, ' ,,, ')
        if (players) {
          throw new Error('Players name is required')
        }
        return value
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
        return value
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
        return value
      }
    }
  }
})
