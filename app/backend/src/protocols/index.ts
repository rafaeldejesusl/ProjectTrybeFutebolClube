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
}

export interface IMatchModel {
  getAll(inProgress: boolean | null): Promise<IMatch[]>
  create(match: IMatch): Promise<IMatch>
}
