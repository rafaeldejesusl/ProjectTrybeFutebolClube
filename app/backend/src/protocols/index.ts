export interface IUser {
  id?: number;
  username: string;
  role: string;
  email: string;
  password: string;
}

export interface IUserService {
  login(email: string, password: string): Promise<string | boolean>
  loginValidate(token: string): Promise<string | boolean>
}

export interface IUserModel {
  findByEmail(email: string): Promise<IUser | null>
  findById(id: number): Promise<IUser | null>
}

export interface ITeam {
  id?: number;
  teamName: string;
}

export interface ITeamService {
  getAll(): Promise<ITeam[]>
  getById(id: number): Promise<ITeam | boolean>
}

export interface ITeamModel {
  getAll(): Promise<ITeam[]>
  getById(id: number): Promise<ITeam | null>
}

export interface IMatch {
  id?: number;
  homeTeam: number;
  homeTeamGoals: number;
  awayTeam: number;
  awayTeamGoals: number;
  inProgress?: boolean;
  teamHome?: {
    teamName: string;
  };
  teamAway?: {
    teamName: string;
  }
}

export interface IMatchService {
  getAll(inProgress: boolean | null): Promise<IMatch[]>
  create(match: IMatch): Promise<IMatch>
  finish(id: number): Promise<void>
  update(id: number, homeTeamGoals: number, awayTeamGoals: number): Promise<void>
}

export interface IMatchModel {
  getAll(inProgress: boolean | null): Promise<IMatch[]>
  create(match: IMatch): Promise<IMatch>
  finish(id: number): Promise<void>
  update(id: number, homeTeamGoals: number, awayTeamGoals: number): Promise<void>
}

export interface IBoard {
  name: string;
  totalPoints: number;
  totalGames: number;
  totalVictories: number;
  totalDraws: number;
  totalLosses: number;
  goalsFavor: number;
  goalsOwn: number;
  goalsBalance: number;
  efficiency: number;
}

export interface IBoardService {
  getAllHome(): Promise<IBoard[]>
  getAllAway(): Promise<IBoard[]>
  getAll(): Promise<IBoard[]>
}
