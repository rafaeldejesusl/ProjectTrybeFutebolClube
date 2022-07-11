import { Router } from 'express';
import { MatchFactory } from '../factory';
import { validateTeamMatch, validateTeamOnDb } from '../middlewares/match.middlewares';

const matchRouter = Router();

matchRouter.get('/matches', (req, res, next) => {
  MatchFactory().getAll(req, res, next);
});

matchRouter.post('/matches', validateTeamMatch, validateTeamOnDb, (req, res, next) => {
  MatchFactory().create(req, res, next);
});

matchRouter.patch('/matches/:id/finish', (req, res, next) => {
  MatchFactory().finish(req, res, next);
});

export default matchRouter;
