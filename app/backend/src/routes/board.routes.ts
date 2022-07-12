import { Router } from 'express';
import { BoardFactory } from '../factory';

const boardRouter = Router();

boardRouter.get('/leaderboard/home', (req, res, next) => {
  BoardFactory().getAllHome(req, res, next);
});

export default boardRouter;
