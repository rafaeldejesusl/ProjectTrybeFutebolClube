import { Router } from 'express';
import { BoardFactory } from '../factory';

const boardRouter = Router();

boardRouter.get('/leaderboard/home', (req, res, next) => {
  BoardFactory().getAllHome(req, res, next);
});

boardRouter.get('/leaderboard/away', (req, res, next) => {
  BoardFactory().getAllAway(req, res, next);
});

boardRouter.get('/leaderboard', (req, res, next) => {
  BoardFactory().getAll(req, res, next);
});

export default boardRouter;
