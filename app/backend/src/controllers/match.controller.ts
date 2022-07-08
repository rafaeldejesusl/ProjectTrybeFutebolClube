import { NextFunction, Request, Response } from 'express';
import { IMatchService } from '../protocols';

export default class MatchController {
  constructor(private service: IMatchService) {
    this.service = service;
  }

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const { inProgress } = req.query;
      let bool = null;
      if (inProgress === 'false') bool = false;
      if (inProgress === 'true') bool = true;
      const matches = await this.service.getAll(bool);
      return res.status(200).json(matches);
    } catch (error) {
      next(error);
    }
  }
}
