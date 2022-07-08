import * as chai from 'chai';
import { before } from 'mocha';
import * as sinon from 'sinon';
import * as jwt from 'jsonwebtoken';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import User from '../database/models/User';

const userMock = {
  id: 1,
  username: 'batatinha',
  role: 'user',
  email: 'batatinha@email.com',
  password: '$2a$08$Y8Abi8jXvsXyqm.rmp0B.uQBA5qUz7T6Ghlg/CvVr/gLxYj5UAZVO',
}

chai.use(chaiHttp);

const { expect } = chai;

describe('Model User', () => {
  before(() => {
    sinon.stub(User, 'findOne')
      .resolves(userMock as User) // para async
    sinon.stub(jwt, 'sign').resolves('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjU0NTI3MTg5fQ.XS_9AA82iNoiVaASi0NtJpqOQ_gHSHhxrpIdigiT-fc')
  });

  after(() => {
    (User.findOne as sinon.SinonStub)
      .restore();
    (jwt.sign as sinon.SinonStub).restore();
  })

  it('metodo post /login', async () => {
    const response = await chai.request(app).post('/login').send({ email: userMock.email, password: 'secret_user' });
    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.eql({ token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjU0NTI3MTg5fQ.XS_9AA82iNoiVaASi0NtJpqOQ_gHSHhxrpIdigiT-fc' }); // eql compare objects
  });
});

describe('Model User', () => {
  before(() => {
    sinon.stub(User, 'findOne')
      .resolves(null);
  });

  after(() => {
    (User.findOne as sinon.SinonStub)
      .restore();
  })

  it('metodo post /login com email inválido', async () => {
    const response = await chai.request(app).post('/login').send({ email: userMock.email, password: 'secret_user' });
    expect(response.status).to.be.equal(401);
    expect(response.body).to.be.eql({ message: "Incorrect email or password" });
  });
});