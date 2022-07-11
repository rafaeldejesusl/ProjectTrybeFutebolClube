import * as chai from 'chai';
import { before } from 'mocha';
import * as sinon from 'sinon';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Match from '../database/models/Match';
import { IMatch } from '../protocols';

const matchMock = {
  id: 1,
  homeTeam: 16,
  homeTeamGoals: 1,
  awayTeam: 8,
  awayTeamGoals: 1,
  inProgress: false,
  teamHome: {
    teamName: "São Paulo"
  },
  teamAway: {
    teamName: "Grêmio"
  },
};

chai.use(chaiHttp);

const { expect } = chai;

describe('Model Match', () => {
  before(() => {
    sinon.stub(Match, 'findAll')
      .resolves([matchMock] as unknown as Match[]); // para async
  });

  after(() => {
    (Match.findAll as sinon.SinonStub)
      .restore();
  })

  it('metodo get /matches', async () => {
    const response = await chai.request(app).get('/matches');
    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.eql([matchMock]); // eql compare objects
  });
});


describe('Model Match', () => {
  before(() => {
    sinon.stub(Match, 'findAll')
      .resolves([matchMock] as unknown as Match[]); // para async
  });

  after(() => {
    (Match.findAll as sinon.SinonStub)
      .restore();
  })

  it('metodo get /matches com query inProgress = false', async () => {
    const response = await chai.request(app).get('/matches?inProgress=false');
    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.eql([matchMock]); // eql compare objects
  });
});

describe('Model Match', () => {
  before(() => {
    sinon.stub(Match, 'findAll')
      .resolves([matchMock] as unknown as Match[]); // para async
  });

  after(() => {
    (Match.findAll as sinon.SinonStub)
      .restore();
  })

  it('metodo get /matches com query inProgress = true', async () => {
    const response = await chai.request(app).get('/matches?inProgress=true');
    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.eql([matchMock]); // eql compare objects
  });
});

describe('Model Match', () => {
  before(() => {
    sinon.stub(Match, 'create')
      .resolves(matchMock as unknown as Match); // para async
  });

  after(() => {
    (Match.create as sinon.SinonStub)
      .restore();
  })

  it('metodo post /matches', async () => {
    const response = await chai.request(app).post('/matches').send(matchMock);
    expect(response.status).to.be.equal(201);
    expect(response.body).to.be.eql(matchMock); // eql compare objects
  });
});

describe('Model Match', () => {
  before(() => {
    sinon.stub(Match, 'create')
      .resolves(matchMock as unknown as Match); // para async
  });

  after(() => {
    (Match.create as sinon.SinonStub)
      .restore();
  })

  it('metodo post /matches com times iguais', async () => {
    const response = await chai.request(app).post('/matches').send({ homeTeam: 8, awayTeam: 8 });
    expect(response.status).to.be.equal(401);
    expect(response.body).to.be.eql({ message: 'It is not possible to create a match with two equal teams' }); // eql compare objects
  });
});

describe('Model Match', () => {
  before(() => {
    sinon.stub(Match, 'update')
      .resolves(); // para async
  });

  after(() => {
    (Match.update as sinon.SinonStub)
      .restore();
  })

  it('metodo patch /matches/:id/finish', async () => {
    const response = await chai.request(app).patch('/matches/1/finish');
    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.eql({ message: 'Finished' }); // eql compare objects
  });
});