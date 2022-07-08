import Model from '../database/models/Team';
import { ITeam, ITeamModel } from '../protocols';

export default class TeamRepository implements ITeamModel {
  constructor(private model = Model) {
    this.model = model;
  }

  async getAll(): Promise<ITeam[]> {
    const teams = await this.model.findAll();
    return teams;
  }
}
