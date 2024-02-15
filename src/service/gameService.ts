import { Game, NewGame } from '../types/game.types'
import gameSchema from '../schemas/game.schema'
import cardSchema from '../schemas/card.schema'
import { Player } from '../types/types'

export const addGame = async (newGame: NewGame): Promise<Game> => {
  const { lavel, category } = newGame

  const getCards = await cardSchema.find({ lavel, category }).limit(16)

  const game = await gameSchema.create({
    ...newGame,
    cards: getCards
  })
  await game.save()

  return game
}

export const getGameByIdService = async (idGame: string): Promise<Game[]> => {
  const game = await gameSchema.find({ _id: idGame })
  if (game.length === 0) {
    throw new Error('Game not found')
  }
  return game
}

export const enterTheGameService = async (idGame: string, player: Player): Promise<Game> => {
  const game = await gameSchema.findOne({ _id: idGame, 'playerLimit.4': { $exists: true } })
  if (game == null) {
    throw new Error('Game not found')
  }

  if (game.players.length >= 4) {
    throw new Error('Game is full')
  }

  const namePlayers = game.players.map(player => player.name)
  if (namePlayers.includes(player.name)) {
    throw new Error('Player already exists')
  }

  // actualizar el campo player para agregar al nuevo player
  await game.updateOne({ $push: { players: player } })

  return game
}
