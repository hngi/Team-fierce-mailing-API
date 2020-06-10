/* eslint-env mocha */

const express = require('express');
const request = require('supertest');
const routeFunc = require('./mailingRoutes');
const assert = require('assert');


const fakeController = () => {
  const sendMail = (req, res) => {
    return res.status(200).json({
      message: 'SendMail Route working as expected'
    });
  };

  const sendMailWithTemplate = (req, res) => {
    return res.status(200).json({
      message: 'SendMailWithTemplate Route working as expected'
    });
  };

  return Object.create({ sendMail, sendMailWithTemplate });
};

const app = express();
app.use('/api/v1', routeFunc(express.Router(), fakeController));

describe('Checking if router is routing successfully', (done) => {
  let newApp = null;

  beforeEach(() => {
   newApp =  app.listen(3000);
  })

  afterEach(()=> {
    newApp.close();
    newApp = null
  })

  it('routes to send mail', (done) => {
    request(newApp)
      .post('/api/v1/sendmail')
      .expect(200)
      .end((err, res) => {
        assert.ok(res.body);
        console.log(res.body);
        done();
      });
  });

  it('routes successfully sendmailwithtemplate', (done) => {
    request(newApp)
      .post('/api/v1/sendmailwithtemplate')
      .expect(200)
      .end((err, res) => {
        assert.ok(res.body);
        console.log(res.body)
        done();
      });
  });

})
