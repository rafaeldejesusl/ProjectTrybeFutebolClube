import { NextFunction, Request, Response } from 'express';
import { ITeamService } from '../protocols';

export default class TeamController {
  constructor(private service: ITeamService) {
    this.service = service;
  }

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const teams = await this.service.getAll();
      return res.status(200).json(teams);
    } catch (error) {
      next(error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const team = await this.service.getById(Number(id));
      if (!team) return res.status(404).json({ message: 'Team not found' });
      return res.status(200).json(team);
    } catch (error) {
      next(error);
    }
  }
}
