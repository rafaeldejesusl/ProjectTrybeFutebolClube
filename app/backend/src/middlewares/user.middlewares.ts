import { NextFunction, Request, Response } from 'express';

export function validateEmail(req: Request, res: Response, next: NextFunction) {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: 'All fields must be filled' });
  return next();
}

export function validatePassword(req: Request, res: Response, next: NextFunction) {
  const { password } = req.body;
  if (!password) return res.status(400).json({ message: 'All fields must be filled' });
  return next();
}

export function validateToken(req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers;
  if (!authorization) return res.status(401).json({ message: 'Token is required' });
  return next();
}
