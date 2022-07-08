import { Router } from 'express';
import { TeamFactory } from '../factory';

const teamRouter = Router();

teamRouter.get('/teams', (req, res, next) => {
  TeamFactory().getAll(req, res, next);
});

teamRouter.get('/teams/:id', (req, res, next) => {
  TeamFactory().getById(req, res, next);
});

export default teamRouter;
