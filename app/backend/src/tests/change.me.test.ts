import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes de Integração - Seção 1: Users e Login', () => {
  
  let chaiHttpResponse: Response;
  it('Endpoint /login - verificar que é possível realizar um login com sucesso', async () => {
      chaiHttpResponse = await chai.request(app).post('/login').send({ 
          email:"admin@admin.com", 
          password:"secret_admin" 
      });
      expect(chaiHttpResponse).to.have.status(200);
      expect(chaiHttpResponse).to.be.json;
      expect(chaiHttpResponse.body).to.have.property('token');
  });

  it('Endpoint /login - não permite o acesso sem informar um e-mail', async () => {
    chaiHttpResponse = await chai.request(app).post('/login').send({ 
        email:"", 
        password:"secret_admin" 
    });
    expect(chaiHttpResponse).to.have.status(400);
    expect(chaiHttpResponse).to.be.json;
    expect(chaiHttpResponse.body).to.have.property('message');
    expect(chaiHttpResponse.body.message).to.equal('All fields must be filled');
    });

  it('Endpoint /login - não permite o acesso sem informar password', async () => {
    chaiHttpResponse = await chai.request(app).post('/login').send({ 
        email:"admin@admin.com", 
        password:"" 
    });
    expect(chaiHttpResponse).to.have.status(400);
    expect(chaiHttpResponse).to.be.json;
    expect(chaiHttpResponse.body).to.have.property('message');
    expect(chaiHttpResponse.body.message).to.equal('All fields must be filled');
    });

  it('Endpoint /login - verificar que não é possível realizar um login com email inválido', async () => {
      chaiHttpResponse = await chai.request(app).post('/login').send({ 
          email:"ad", 
          password:"secret_admin" 
      });
      expect(chaiHttpResponse).to.have.status(400);
      expect(chaiHttpResponse).to.be.json;
      expect(chaiHttpResponse.body).to.have.property('message');
      expect(chaiHttpResponse.body.message).to.equal('Incorrect email or password');
  });


});

describe('Testes de Integração - Seção 2: Times', () => {
  let chaiHttpResponse: Response;

  it('Endpoint /teams - verificar que é possível listar todos os times com sucesso', async () => {
    chaiHttpResponse = await chai.request(app).get('/teams');
    expect(chaiHttpResponse).to.have.status(200);
    expect(chaiHttpResponse).to.be.json;
  });

  it('Endpoint /teams - verificar que é possível listar um time específico com sucesso', async () => {
    chaiHttpResponse = await chai.request(app).get('/teams/5');
    expect(chaiHttpResponse).to.have.status(200);
    expect(chaiHttpResponse).to.be.json;
  });
});

describe('Testes de Integração - Seção 3: Partidas', () => {
  let chaiHttpResponse: Response;

  it('Endpoint /teams - verificar que é possível listar todas as partidas com sucesso', async () => {
    chaiHttpResponse = await chai.request(app).get('/matches');
    expect(chaiHttpResponse).to.have.status(200);
    expect(chaiHttpResponse).to.be.json;
  });
});
