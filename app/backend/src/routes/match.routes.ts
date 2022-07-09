import { Router } from 'express';
import { MatchFactory } from '../factory';

const matchRouter = Router();

matchRouter.get('/matches', (req, res, next) => {
  MatchFactory().getAll(req, res, next);
});

matchRouter.post('/matches', (req, res, next) => {
  MatchFactory().create(req, res, next);
});

export default matchRouter;
