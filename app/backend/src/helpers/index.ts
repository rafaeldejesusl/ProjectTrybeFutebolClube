import { IMatch, IBoard, ITeam } from '../protocols';

function getHomeGoals(matches: IMatch[]) {
  const goals = { goalsFavor: 0, goalsOwn: 0, goalsBalance: 0 };
  matches.forEach((e) => {
    goals.goalsFavor += e.homeTeamGoals;
    goals.goalsOwn += e.awayTeamGoals;
  });
  goals.goalsBalance = goals.goalsFavor - goals.goalsOwn;
  return goals;
}

function getAwayGoals(matches: IMatch[]) {
  const goals = { goalsFavor: 0, goalsOwn: 0, goalsBalance: 0 };
  matches.forEach((e) => {
    goals.goalsFavor += e.awayTeamGoals;
    goals.goalsOwn += e.homeTeamGoals;
  });
  goals.goalsBalance = goals.goalsFavor - goals.goalsOwn;
  return goals;
}

function getHomeResult(matches: IMatch[]) {
  const total = { totalVictories: 0, totalDraws: 0, totalLosses: 0 };
  matches.forEach((e) => {
    if (e.homeTeamGoals - e.awayTeamGoals > 0) total.totalVictories += 1;
    else if (e.homeTeamGoals - e.awayTeamGoals < 0) total.totalLosses += 1;
    else total.totalDraws += 1;
  });
  return total;
}

function getAwayResult(matches: IMatch[]) {
  const total = { totalVictories: 0, totalDraws: 0, totalLosses: 0 };
  matches.forEach((e) => {
    if (e.awayTeamGoals - e.homeTeamGoals > 0) total.totalVictories += 1;
    else if (e.awayTeamGoals - e.homeTeamGoals < 0) total.totalLosses += 1;
    else total.totalDraws += 1;
  });
  return total;
}

function getTotals(victories: number, draws: number, losses: number) {
  const totalGames = victories + draws + losses;
  const totalPoints = victories * 3 + draws * 1;
  const efficiency = Math.round((totalPoints * 10000) / (totalGames * 3)) / 100;
  return { totalGames, totalPoints, efficiency };
}

export function getHomeBoard(team: ITeam, myMatches: IMatch[]) {
  const { goalsFavor, goalsOwn, goalsBalance } = getHomeGoals(myMatches);
  const { totalVictories, totalDraws, totalLosses } = getHomeResult(myMatches);
  const { totalGames, totalPoints, efficiency } = getTotals(
    totalVictories,
    totalDraws,
    totalLosses,
  );
  const name = team.teamName;
  return { name,
    totalPoints,
    totalGames,
    totalVictories,
    totalDraws,
    totalLosses,
    goalsFavor,
    goalsOwn,
    goalsBalance,
    efficiency };
}

export function getAwayBoard(team: ITeam, myMatches: IMatch[]) {
  const { goalsFavor, goalsOwn, goalsBalance } = getAwayGoals(myMatches);
  const { totalVictories, totalDraws, totalLosses } = getAwayResult(myMatches);
  const { totalGames, totalPoints, efficiency } = getTotals(
    totalVictories,
    totalDraws,
    totalLosses,
  );
  const name = team.teamName;
  return { name,
    totalPoints,
    totalGames,
    totalVictories,
    totalDraws,
    totalLosses,
    goalsFavor,
    goalsOwn,
    goalsBalance,
    efficiency };
}

export function getBoard(team: ITeam, myMatchesAway: IMatch[], myMatchesHome: IMatch[]) {
  const away = getAwayBoard(team, myMatchesAway);
  const home = getHomeBoard(team, myMatchesHome);
  const board = { name: team.teamName,
    totalPoints: away.totalPoints + home.totalPoints,
    totalGames: away.totalGames + home.totalGames,
    totalVictories: away.totalVictories + home.totalVictories,
    totalDraws: away.totalDraws + home.totalDraws,
    totalLosses: away.totalLosses + home.totalLosses,
    goalsFavor: away.goalsFavor + home.goalsFavor,
    goalsOwn: away.goalsOwn + home.goalsOwn,
    goalsBalance: away.goalsBalance + home.goalsBalance,
    efficiency: 0 };
  board.efficiency = Math.round((board.totalPoints * 10000) / (board.totalGames * 3)) / 100;
  return board;
}

export function orderBoard(board: IBoard[]) {
  const newBoard = board.sort((a, b) => {
    if (a.totalPoints > b.totalPoints) return -1;
    if (a.totalPoints < b.totalPoints) return 1;
    if (a.totalVictories > b.totalVictories) return -1;
    if (a.totalVictories < b.totalVictories) return 1;
    if (a.goalsBalance > b.goalsBalance) return -1;
    if (a.goalsBalance < b.goalsBalance) return 1;
    if (a.goalsFavor > b.goalsFavor) return -1;
    if (a.goalsFavor < b.goalsFavor) return 1;
    if (a.goalsOwn < b.goalsOwn) return -1;
    if (a.goalsOwn > b.goalsOwn) return 1;
    return 0;
  });
  return newBoard;
}
