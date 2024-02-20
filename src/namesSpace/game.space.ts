import { Socket } from 'socket.io'
import gameSchema from '../schemas/game.schema'
import { NewGame } from '../types/game.types'

// middleware
import { apllyMiddleware } from '../middlewares/socket/apply.middleware'

export const gameSpace = (io: any): any => {
  const game = io.of('/game')

  game.on('connection', (socket: Socket) => {
    console.log('a user connected to game space ', socket.id)
    socket.use((event, next) => {
      apllyMiddleware(socket, event, next)
    })

    socket.on('disconnect', () => {
      console.log('user disconnected from game space')
    })

    socket.on('game create', async (data: NewGame) => {
      const players = data.players.map(player => {
        return {
          ...player,
          socket: socket.id
        }
      })

      data.players = players

      await gameSchema.create(data)
        .then(game => socket.emit('game create', game))
        .catch(err => console.log(err))
      // const room = gameCreate.id

      // socket.join(room)
    })

    socket.on('game join', async (data) => {
      const gameFind = await gameSchema.findOne({ _id: data.id })
      const id = gameFind?.id
      await gameFind?.updateOne({ $push: { players: data.player } } as any)
      await gameFind?.save()
      await socket.join(id)
      socket.emit('game join', gameFind)
    })
    socket.on('message', async () => {
      game.emit('message', 'hola')
    })
  })
}
