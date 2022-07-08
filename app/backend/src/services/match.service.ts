import { IMatch, IMatchModel, IMatchService } from '../protocols';

export default class MatchService implements IMatchService {
  constructor(private model: IMatchModel) {
    this.model = model;
  }

  async getAll(): Promise<IMatch[]> {
    const matches = await this.model.getAll();
    return matches;
  }
}
