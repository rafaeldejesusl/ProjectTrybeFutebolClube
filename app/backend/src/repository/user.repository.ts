import Model from '../database/models/User';
import { IUser, IUserModel } from '../protocols';

export default class UserRepository implements IUserModel {
  constructor(private model = Model) {
    this.model = model;
  }

  async findByEmail(email: string): Promise<IUser | null> {
    const user = await this.model.findOne({ where: { email } });
    return user;
  }

  async findById(id: number): Promise<IUser | null> {
    const user = await this.model.findByPk(id);
    return user;
  }
}
