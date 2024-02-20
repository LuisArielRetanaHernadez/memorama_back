import { gameMiddleware } from './game/game.middleware'
const middlewares = {
  ...gameMiddleware
}
export const apllyMiddleware = (event: any[], next: any): any => {
  const middlewareCheck = middlewares[event[0]]
  if (middlewareCheck) {
    middlewareCheck(this, event[1], next)
  } else {
    next()
  }
}
