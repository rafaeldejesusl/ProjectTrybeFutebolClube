import Model from '../database/models/Match';
import teamModel from '../database/models/Team';
import { IMatch, IMatchModel } from '../protocols';

export default class MatchRepository implements IMatchModel {
  constructor(private model = Model) {
    this.model = model;
  }

  async getAll(inProgress: boolean | null): Promise<IMatch[]> {
    let matches: unknown;
    if (inProgress === null) {
      matches = await this.model.findAll({ include: [
        { model: teamModel, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: teamModel, as: 'teamAway', attributes: { exclude: ['id'] } },
      ] });
    } else {
      matches = await this.model.findAll({ where: { inProgress },
        include: [
          { model: teamModel, as: 'teamHome', attributes: { exclude: ['id'] } },
          { model: teamModel, as: 'teamAway', attributes: { exclude: ['id'] } },
        ] });
    }
    return matches as IMatch[];
  }

  async create(match: IMatch): Promise<IMatch> {
    const { homeTeam, homeTeamGoals, awayTeam, awayTeamGoals } = match;
    const createdMatch = await this.model.create({
      homeTeam,
      homeTeamGoals,
      awayTeam,
      awayTeamGoals,
      inProgress: true,
    });
    return createdMatch;
  }
}
