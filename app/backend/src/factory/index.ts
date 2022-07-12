import TeamRepository from '../repository/team.repository';
import UserController from '../controllers/user.controller';
import UserRepository from '../repository/user.repository';
import UserService from '../services/user.service';
import TeamService from '../services/team.service';
import TeamController from '../controllers/team.controller';
import MatchRepository from '../repository/match.repository';
import MatchService from '../services/match.service';
import MatchController from '../controllers/match.controller';
import BoardService from '../services/board.service';
import BoardController from '../controllers/board.controller';

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

export const MatchFactory = () => {
  const repository = new MatchRepository();
  const service = new MatchService(repository);
  const controller = new MatchController(service);

  return controller;
};

export const BoardFactory = () => {
  const matchRepository = new MatchRepository();
  const teamRepository = new TeamRepository();
  const service = new BoardService(matchRepository, teamRepository);
  const controller = new BoardController(service);

  return controller;
};
