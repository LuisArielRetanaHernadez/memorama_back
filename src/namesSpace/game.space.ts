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
      const players = data.players.map((player, index) => {
        return {
          ...player,
          isShift: index === 0,
          shift: index++,
          position: index++,
          socket: socket.id
        }
      })

      data.players = players
      data.administrator = players[0]

      const gameCreate = await gameSchema.create(data)

      await gameCreate.save()

      game.emit('game create', gameCreate)
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
      game.to(data.id).emit('start game', gameFind)
    })

    // socket.on('flip card', async (data) => {
    //   const gameFind = await gameSchema.findOne({ _id: data.id, status: 'started' })
    //   if (gameFind === null) {
    //     throw new Error('Game not found')
    //   }
    //   const player = gameFind.players.find((player) => player.socket === socket.id)
    //   game.to(data.id).emit('flip card', gameFind)
    // })
  })
}
