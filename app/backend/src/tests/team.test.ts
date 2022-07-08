import * as chai from 'chai';
import { before } from 'mocha';
import * as sinon from 'sinon';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Team from '../database/models/Team';

const teamMock = {
	id: 5,
	teamName: "Cruzeiro"
}

chai.use(chaiHttp);

const { expect } = chai;

describe('Model Team', () => {
  before(() => {
    sinon.stub(Team, 'findAll')
      .resolves([teamMock] as Team[]); // para async
  });

  after(() => {
    (Team.findAll as sinon.SinonStub)
      .restore();
  })

  it('metodo get /teams', async () => {
    const response = await chai.request(app).get('/teams');
    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.eql([{ id: 5, teamName: "Cruzeiro" }]); // eql compare objects
  });
});

describe('Model Team', () => {
  before(() => {
    sinon.stub(Team, 'findByPk')
      .resolves(teamMock as Team);
  });

  after(() => {
    (Team.findByPk as sinon.SinonStub)
      .restore();
  })

  it('metodo get /teams/:id', async () => {
    const response = await chai.request(app).get('/teams/5');
    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.eql({ id: 5, teamName: "Cruzeiro" });
  });
});

describe('Model Team', () => {
  before(() => {
    sinon.stub(Team, 'findByPk')
      .resolves(null);
  });

  after(() => {
    (Team.findByPk as sinon.SinonStub)
      .restore();
  })

  it('metodo get /teams/:id com id inválido', async () => {
    const response = await chai.request(app).get('/teams/5');
    expect(response.status).to.be.equal(404);
    expect(response.body).to.be.eql({ message: 'Team not found' });
  });
});
