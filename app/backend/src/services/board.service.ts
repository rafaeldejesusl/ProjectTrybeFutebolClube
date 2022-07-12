import { IBoard, IBoardService, IMatchModel, ITeamModel } from '../protocols';
import { getBoard, orderBoard } from '../helpers';

export default class BoardService implements IBoardService {
  constructor(private matchModel: IMatchModel, private teamModel: ITeamModel) {
    this.matchModel = matchModel;
    this.teamModel = teamModel;
  }

  async getAllHome(): Promise<IBoard[]> {
    const matches = await this.matchModel.getAll(false);
    const teams = await this.teamModel.getAll();
    const board = teams.map((team) => {
      const myMatches = matches.filter((e) => e.homeTeam === team.id);
      return getBoard(team, myMatches);
    });
    const orderedBoard = orderBoard(board);
    return orderedBoard;
  }
}
