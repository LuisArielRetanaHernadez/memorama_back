import { Game, NewGame } from '../types/game.types'
import gameSchema from '../schemas/game.schema'

export const addGame = async (newGame: NewGame): Promise<Game> => {
  const game = await gameSchema.create(newGame)
  await game.save()
  return game
}

export const getGameById = async (idGame: string): Promise<Game[]> => {
  const game = await gameSchema.find({ _id: idGame })
  if (game.length === 0) {
    throw new Error('Game not found')
  }
  return game
}
