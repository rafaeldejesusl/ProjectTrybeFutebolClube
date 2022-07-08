import { ITeam, ITeamModel, ITeamService } from '../protocols';

export default class TeamService implements ITeamService {
  constructor(private model: ITeamModel) {
    this.model = model;
  }

  async getAll(): Promise<ITeam[]> {
    const teams = await this.model.getAll();
    return teams;
  }
}
