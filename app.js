import * as express from 'express';
import routerGame from './routes/game.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/game', routerGame)

export default app;
