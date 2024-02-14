import { Game, NewGame } from '../types/game.types'
import gameSchema from '../schemas/game.schema'

export const addGame = async (newGame: NewGame): Promise<Game> => {
  const game = await gameSchema.create(newGame)
  await game.save()
  return game
}
