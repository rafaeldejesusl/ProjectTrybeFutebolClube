import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import TeamRepository from '../repository/team.repository';
import 'dotenv/config';

const secret = process.env.JWT_SECRET || 'jwt_secret';

const teamModel = new TeamRepository();

export function validateTeamMatch(req: Request, res: Response, next: NextFunction) {
  const { homeTeam, awayTeam } = req.body;
  if (homeTeam === awayTeam) {
    return res.status(401)
      .json({ message: 'It is not possible to create a match with two equal teams' });
  }
  next();
}

export async function validateTeamOnDb(req: Request, res: Response, next: NextFunction) {
  const { homeTeam, awayTeam } = req.body;
  const team1 = await teamModel.getById(Number(homeTeam));
  const team2 = await teamModel.getById(Number(awayTeam));
  if (team1 === null || team2 === null) {
    return res.status(404).json({ message: 'There is no team with such id!' });
  }
  next();
}

export async function validateToken(req: Request, res: Response, next: NextFunction) {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }
    await jwt.verify(authorization, secret);
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
}
