import app from './app'
import { connectDB } from './src/db/connect'

// socket io
import { createServer } from 'http'
import { Server } from 'socket.io'
import { gameSpace } from './src/namesSpace/game.space'

const httpServer = createServer(app)
const io = new Server(httpServer, {})

// io.on('connection', _socket => {
//   console.log('a user connected')
// })
gameSpace(io)
const PORT = 3333

httpServer.listen(PORT, () => {
  connectDB().then(() => console.log('Database connected')).catch(console.error)
  console.log('Server is running on port 3333')
})
