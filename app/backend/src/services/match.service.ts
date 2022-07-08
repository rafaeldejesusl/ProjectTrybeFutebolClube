import { IMatch, IMatchModel, IMatchService } from '../protocols';

export default class MatchService implements IMatchService {
  constructor(private model: IMatchModel) {
    this.model = model;
  }

  async getAll(inProgress: boolean | null): Promise<IMatch[]> {
    const matches = await this.model.getAll(inProgress);
    return matches;
  }
}
