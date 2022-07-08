import 'dotenv/config';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { IUserModel, IUserService } from '../protocols/index';

const secret = process.env.JWT_SECRET || 'jwt_secret';
const jwtConfig = {
  algorithm: 'HS256',
} as jwt.SignOptions;

export default class UserService implements IUserService {
  constructor(private model: IUserModel) {
    this.model = model;
  }

  async login(email: string, password: string): Promise<string | boolean> {
    const user = await this.model.findByEmail(email);
    if (!user) return false;
    const check = bcrypt.compareSync(password, user.password);
    if (!check) return false;
    const { id, role, username } = user;
    const token = jwt.sign({ id, username, role, email }, secret, jwtConfig);
    return token;
  }
}
