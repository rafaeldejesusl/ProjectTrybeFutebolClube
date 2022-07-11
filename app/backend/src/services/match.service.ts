import { IMatch, IMatchModel, IMatchService } from '../protocols';

export default class MatchService implements IMatchService {
  constructor(private model: IMatchModel) {
    this.model = model;
  }

  async getAll(inProgress: boolean | null): Promise<IMatch[]> {
    const matches = await this.model.getAll(inProgress);
    return matches;
  }

  async create(match: IMatch): Promise<IMatch> {
    const createdMatch = await this.model.create(match);
    return createdMatch;
  }

  async finish(id: number): Promise<void> {
    await this.model.finish(id);
  }

  async update(id: number, homeTeamGoals: number, awayTeamGoals: number): Promise<void> {
    await this.model.update(id, homeTeamGoals, awayTeamGoals);
  }
}
