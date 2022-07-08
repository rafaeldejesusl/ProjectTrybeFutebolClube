import { Router } from 'express';
import { MatchFactory } from '../factory';

const matchRouter = Router();

matchRouter.get('/matches', (req, res, next) => {
  MatchFactory().getAll(req, res, next);
});

export default matchRouter;
