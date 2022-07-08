import { NextFunction, Request, Response } from 'express';

export default function validateEmail(req: Request, res: Response, next: NextFunction) {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: 'All fields must be filled' });
  return next();
}
