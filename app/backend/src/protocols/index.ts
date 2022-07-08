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
