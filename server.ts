import app from './app'
import { connectDB } from './src/db/connect'

// socket io
import { createServer } from 'http'
import { Server } from 'socket.io'
import { gameSpace } from './src/namesSpace/game.space'

const httpServer = createServer(app)
const io = new Server(httpServer, {
  cors: {
    origin: '*'
  },
  connectionStateRecovery: {
    maxDisconnectionDuration: 1000,
    skipMiddlewares: true
  }
})

gameSpace(io)
export { io }
const PORT = 3333

httpServer.listen(PORT, () => {
  connectDB().then(() => console.log('Database connected')).catch(console.error)
  console.log('Server is running on port 3333')
})
