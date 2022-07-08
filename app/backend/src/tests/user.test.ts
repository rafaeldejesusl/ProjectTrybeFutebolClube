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

describe('Model User', () => {
  before(() => {
    sinon.stub(User, 'findOne')
      .resolves(userMock as User);
  });

  after(() => {
    (User.findOne as sinon.SinonStub)
      .restore();
  })

  it('metodo post /login com senha inválido', async () => {
    const response = await chai.request(app).post('/login').send({ email: userMock.email, password: 'secret' });
    expect(response.status).to.be.equal(401);
    expect(response.body).to.be.eql({ message: "Incorrect email or password" });
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

  it('metodo post /login sem enviar o email', async () => {
    const response = await chai.request(app).post('/login').send({ password: 'secret_user' });
    expect(response.status).to.be.equal(400);
    expect(response.body).to.be.eql({ message: 'All fields must be filled' });
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

  it('metodo post /login sem enviar a senha', async () => {
    const response = await chai.request(app).post('/login').send({ email: userMock.email });
    expect(response.status).to.be.equal(400);
    expect(response.body).to.be.eql({ message: 'All fields must be filled' });
  });
});

describe('Model User', () => {
  before(() => {
    sinon.stub(User, 'findByPk')
      .resolves(userMock as User);
    sinon.stub(jwt, 'verify').resolves(userMock);
  });

  after(() => {
    (User.findByPk as sinon.SinonStub)
      .restore();
    (jwt.verify as sinon.SinonStub).restore();
  })

  it('metodo get /login/validate', async () => {
    const response = await chai.request(app).get('/login/validate').set('authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjU0NTI3MTg5fQ.XS_9AA82iNoiVaASi0NtJpqOQ_gHSHhxrpIdigiT-fc');
    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.eql({ role: 'user' });
  });
});

describe('Model User', () => {
  before(() => {
    sinon.stub(User, 'findByPk')
      .resolves(userMock as User);
  });

  after(() => {
    (User.findByPk as sinon.SinonStub)
      .restore();
  })

  it('metodo get /login/validate sem enviar token', async () => {
    const response = await chai.request(app).get('/login/validate');
    expect(response.status).to.be.equal(401);
    expect(response.body).to.be.eql({ message: 'Token is required' });
  });
});

describe('Model User', () => {
  before(() => {
    sinon.stub(jwt, 'verify').resolves(null);
  });

  after(() => {
    (jwt.verify as sinon.SinonStub).restore();
  })

  it('metodo get /login/validate com token inválido', async () => {
    const response = await chai.request(app).get('/login/validate').set('authorization', 'efc');;
    expect(response.status).to.be.equal(401);
    expect(response.body).to.be.eql({ message: 'Invalid token' });
  });
});

describe('Model User', () => {
  before(() => {
    sinon.stub(User, 'findByPk')
      .resolves(null);
    sinon.stub(jwt, 'verify').resolves(userMock);
  });

  after(() => {
    (User.findByPk as sinon.SinonStub)
      .restore();
    (jwt.verify as sinon.SinonStub).restore();
  })

  it('metodo get /login/validate com token de usuário não existente', async () => {
    const response = await chai.request(app).get('/login/validate').set('authorization', 'efc');;
    expect(response.status).to.be.equal(401);
    expect(response.body).to.be.eql({ message: 'Invalid token' });
  });
});