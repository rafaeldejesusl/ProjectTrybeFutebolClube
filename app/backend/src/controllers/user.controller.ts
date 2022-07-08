import { NextFunction, Request, Response } from 'express';
import { IUserService } from '../protocols';

export default class UserController {
  constructor(private service: IUserService) {
    this.service = service;
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const token = await this.service.login(email, password);
      if (!token) return res.status(401).json({ message: 'Incorrect email or password' });
      return res.status(200).json({ token });
    } catch (error) {
      next(error);
    }
  }

  async loginValidate(req: Request, res: Response, next: NextFunction) {
    try {
      const { authorization } = req.headers;
      const role = await this.service.loginValidate(authorization as string);
      if (!role) return res.status(401).json({ message: 'Invalid token' });
      return res.status(200).json({ role });
    } catch (error) {
      next(error);
    }
  }
}
