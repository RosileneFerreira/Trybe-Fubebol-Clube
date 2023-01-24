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
