import { Socket } from 'socket.io'
import gameSchema from '../schemas/game.schema'

// middleware
import { apllyMiddleware } from '../middlewares/socket/apply.middleware'

export const gameSpace = (io: any): any => {
  // const game = io.of('/game')

  io.of('/game').on('connection', (socket: Socket) => {
    console.log('a user connected to game space ', socket.id)

    socket.use((event, next) => {
      apllyMiddleware(socket, event, next)
    })

    socket.on('disconnect', () => {
      console.log('user disconnected from game space')
    })

    socket.on('game join', async (data) => {
      const gameFind = await gameSchema.findOne({ _id: data.id })
      const id = gameFind?.id

      let position = 1

      if (gameFind?.players?.length !== undefined) {
        position = gameFind?.players.length + 1
      }

      await gameFind?.updateOne({ $push: { players: { ...data.player, socket: socket.id, position } } } as any)
      await gameFind?.save()

      await socket.join(id)
      socket.emit('game join', gameFind)
    })
    socket.on('start game', async (data) => {
      const gameFind = await gameSchema.findOne({ _id: data.id })
      await gameFind?.updateOne({ status: 'started' })
      await gameFind?.save()
      socket.to(data.id).emit('start game', gameFind)
    })

    socket.on('add game', async () => {
      const gameNew = await gameSchema.find({ isOnline: true })
      socket.emit('add game', gameNew)
    })

    socket.on('connection_error', (err) => {
      console.log(err)
      socket.disconnect()
      throw new Error(err)
    })
  })
}
