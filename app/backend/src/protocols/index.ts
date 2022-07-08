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
