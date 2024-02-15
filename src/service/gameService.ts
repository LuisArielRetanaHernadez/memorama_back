import { Game, NewGame } from '../types/game.types'
import gameSchema from '../schemas/game.schema'
import cardSchema from '../schemas/card.schema'

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
