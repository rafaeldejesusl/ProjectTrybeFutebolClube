import Model from '../database/models/Match';
import teamModel from '../database/models/Team';
import { IMatch, IMatchModel } from '../protocols';

export default class MatchRepository implements IMatchModel {
  constructor(private model = Model) {
    this.model = model;
  }

  async getAll(): Promise<IMatch[]> {
    const matches = await this.model.findAll({ include: [
      { model: teamModel, as: 'teamHome', attributes: { exclude: ['id'] } },
      { model: teamModel, as: 'teamAway', attributes: { exclude: ['id'] } },
    ] });
    return matches as [];
  }
}
