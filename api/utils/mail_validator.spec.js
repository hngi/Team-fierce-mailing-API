const assert = require('assert');
const {validate} = require('./mail_validator'); 

console.log(Object.getPrototypeOf(validate))

describe('Schemas Validation', () => {
  
  it('can validate a mail object', (done) => {
    const samplemail = {
      from: 'Noreply <Joedegs@gmail.com>',
      recipient: 'jpedegs8990@gmail.com',
      cc: ['kojiis@gmail.com', 'Joeiejr@ymail.com'],
      bcc: [],
      subject: 'subject of the motherfucking email',
      text: 'Body of the email'
    }
    
    validate(samplemail, 'sendmail')
      .then(value => {
        assert.ok(value);
        done()
      })
      .catch(err => {
        console.log(err)
        done()
      });
  });

  it('it can validate a mail object with template', (done) => {
    const sampleMailWithTemplate = {
      from: 'Test testorisis <noreply@testorisin.com>',
      recipient: 'npedev3443@tmail.com',
      bcc: ['something@smail.com', 'teamfierce@fmail.com'],
      subject: 'This test must PASS',
      html: `
      <h1> A TEST SAMPLE </h1>

      <p> The html body <p><br>

      <h3> ENJOY THIS TEST BYE... </h3>
      `
    };

    validate(sampleMailWithTemplate, 'sendmailwithtemplate')
      .then(value => {
        assert.ok(value);
        done();
      })
      .catch(err => {
        console.log(err);
        done();
      });
  });

  it('return error if email address is not valid', (done) => {
    const sampleMail = {
      from: 'noreply@smap.comd',
      recipient: 'teamfierce.com', //invalid email address
      subject: 'Subject of mail',
      body: 'some random text'
    }

    validate(sampleMail, 'sendmail')
      .then(value => {
        assert.ok(!value);
        done()
      })
      .catch(err => {
        assert.ok(err);
        done();
      })
  });

});

