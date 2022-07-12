import * as chai from 'chai';
import { before } from 'mocha';
import * as sinon from 'sinon';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Match from '../database/models/Match';
import Team from '../database/models/Team';

const matchMock = [
  {
    id: 1,
    homeTeam: 1,
    homeTeamGoals: 1,
    awayTeam: 2,
    awayTeamGoals: 2,
    inProgress: false,
    teamHome: {
      teamName: "Avaí/Kindermann"
    },
    teamAway: {
      teamName: "Bahia"
    },
  },
  {
    id: 2,
    homeTeam: 2,
    homeTeamGoals: 2,
    awayTeam: 1,
    awayTeamGoals: 1,
    inProgress: false,
    teamHome: {
      teamName: "Bahia"
    },
    teamAway: {
      teamName: "Avaí/Kindermann"
    },
  }
];

const teamMock = [
  {
    id: 1,
    teamName: "Avaí/Kindermann"
  },
  {
    id: 2,
    teamName: "Bahia"
  }
]

const boardMock = [
  {
    name: "Bahia",
    totalPoints: 3,
    totalGames: 1,
    totalVictories: 1,
    totalDraws: 0,
    totalLosses: 0,
    goalsFavor: 2,
    goalsOwn: 1,
    goalsBalance: 1,
    efficiency: 100
  },
  {
    name: "Avaí/Kindermann",
    totalPoints: 0,
    totalGames: 1,
    totalVictories: 0,
    totalDraws: 0,
    totalLosses: 1,
    goalsFavor: 1,
    goalsOwn: 2,
    goalsBalance: -1,
    efficiency: 0
  }
]

chai.use(chaiHttp);

const { expect } = chai;

describe('Model Board', () => {
  before(() => {
    sinon.stub(Match, 'findAll')
      .resolves(matchMock as unknown as Match[]);
    sinon.stub(Team, 'findAll').resolves(teamMock as Team[]);
  });

  after(() => {
    (Match.findAll as sinon.SinonStub)
      .restore();
    (Team.findAll as sinon.SinonStub).restore();
  })

  it('metodo get /leaderboard/home', async () => {
    const response = await chai.request(app).get('/leaderboard/home');
    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.eql(boardMock);
  });
});