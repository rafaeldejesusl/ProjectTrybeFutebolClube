import { NextFunction, Request, Response } from 'express';
import { IBoardService } from '../protocols';

export default class BoardController {
  constructor(private service: IBoardService) {
    this.service = service;
  }

  async getAllHome(req: Request, res: Response, next: NextFunction) {
    try {
      const board = await this.service.getAllHome();
      return res.status(200).json(board);
    } catch (error) {
      next(error);
    }
  }

  async getAllAway(req: Request, res: Response, next: NextFunction) {
    try {
      const board = await this.service.getAllAway();
      return res.status(200).json(board);
    } catch (error) {
      next(error);
    }
  }
}
