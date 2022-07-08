import TeamRepository from '../repository/team.repository';
import UserController from '../controllers/user.controller';
import UserRepository from '../repository/user.repository';
import UserService from '../services/user.service';
import TeamService from '../services/team.service';
import TeamController from '../controllers/team.controller';

export const UserFactory = () => {
  const repository = new UserRepository();
  const service = new UserService(repository);
  const controller = new UserController(service);

  return controller;
};

export const TeamFactory = () => {
  const repository = new TeamRepository();
  const service = new TeamService(repository);
  const controller = new TeamController(service);

  return controller;
};
