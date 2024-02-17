import { Game, GamesPagination, NewGame } from '../types/game.types'
import gameSchema from '../schemas/game.schema'
import cardSchema from '../schemas/card.schema'
import { Player } from '../types/types'

import TemplateError from '../utils/templateError'

export const getGamesService = async (limit: number = 6, skip: number = 1): Promise<GamesPagination | TemplateError> => {
  const games = await gameSchema.find({ isOnline: true }).skip(skip).limit(limit)

  if (games.length <= 0) {
    throw new TemplateError('not found Games', 400)
  }

  const gamesPagination: GamesPagination = {
    games,
    total: Math.ceil(games.length / limit),
    page: +skip,
    limit: +limit
  }

  return gamesPagination
}

export const addGame = async (newGame: NewGame): Promise<Game> => {
  const { lavel, category } = newGame

  const getCards = await cardSchema.find({ lavel, category }).limit(16)

  if (getCards.length !== 16 || getCards.length <= 0) {
    throw new Error('Cards not found')
  }

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

export const searchGameService = async (game: String): Promise<Game[] | undefined> => {
  // buscar game por id o nombre
  const games = await gameSchema.find({ $or: [{ _id: game }, { title: game }], isOnline: true })

  if (games.length === 0) {
    return undefined
  }

  const gamesAvailable = games?.filter(game => game.players.length < 4)

  if (gamesAvailable.length === 0) {
    return undefined
  }

  return games
}
