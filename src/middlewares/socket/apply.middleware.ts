import { Socket } from 'socket.io'
import { gameMiddleware } from './game/game.middleware'

interface Middlewares {
  [key: string]: (socket: Socket, event: any, next: any) => void
}
const middlewares: Middlewares = {
  ...gameMiddleware
}
export const apllyMiddleware = (socket: Socket, event: any[], next: any): any => {
  const middlewareCheck = middlewares[event[0]]
  if (middlewareCheck !== undefined) {
    middlewareCheck(socket, event[1], next)
  } else {
    next()
  }
}
