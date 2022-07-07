import * as chai from 'chai';
import { before } from 'mocha';
import * as sinon from 'sinon';
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

describe('User Entity', () => {
  before(() => {
    sinon.stub(User, 'findOne')
      .resolves(userMock as User) // para async
  });

  after(() => {
    (User.findOne as sinon.SinonStub)
      .restore();
  })

  it('method post /login', async () => {
    const response = await chai.request(app).post('/login').send(userMock);
    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.eql({ token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjU0NTI3MTg5fQ.XS_9AA82iNoiVaASi0NtJpqOQ_gHSHhxrpIdigiT-fc' }); // eql compare objects
  });
});