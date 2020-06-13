const debug = require('debug')('app:mailingController');
const nodemailer = require('nodemailer');
const {validateEmail} = require('../utils/mail_validator');
const {validateToken} = require('../utils/token_validator');

function mailingController() {
  function sendMail(req, res) {
    (async function mail() {
      try {
        let { recipient_name,recipient_email,sender_name,sender_email, subject, body, account_id, access_token } = req.body;
        //debug(recipients, subject, body);
        
        if (!recipient_email || !subject || !body) {
          res.status(400).send({
            status: 'failed',
            data: {message: 'Add recipients email, subject and body.'}
          })
          return
        }
        let emailsAreValid = validateEmail(recipient_email);
        if(!emailsAreValid){
          res.status(400).send({
            status: 'failed',
            data: {message: 'Invalid email!'}
          })
        }else{
          let from = `${sender_name} <${sender_email}>`;
        let mailOptions = {
          from: from,
          to: recipient_email,
          cc: [],
          bcc: [],
          subject: subject,
          text: body,
        };

        let transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: process.env.USER,
            pass: process.env.PASSWORD
          }
        });

        transporter.sendMail(mailOptions, function (err, info) {
          if (err) {
            res.status(500).send({
              status: 'failed',
              data: {message: 'An unknown error occured!'}
            });
            debug(err);
          }
          debug(`Email sent: ${info.response}`);
          res.status(200).json({ status: 'success', data: {message: 'mail sent successfully'} });
        })
        //
        }
      } catch (err) {
        debug(err.stack)
      }
    }());
  }

  function sendMailWithTemplate(req, res) {
    (async function mail() {
      try {
        let { recipient_name,recipient_email,sender_name,sender_email, subject, body, account_id, access_token } = req.body;
        //debug(recipients, subject, body);
        
        if (!recipient_email || !subject || !body) {
          res.status(400).send({
            status: 'failed',
            data: {message: 'Add recipients email, subject and body.'}
          })
          return
        }
        let emailsAreValid = validateEmail(recipient_email);
        if(!emailsAreValid){
          res.status(400).send({
            status: 'failed',
            data: {message: 'Invalid email!'}
          })
        }else{
          let from = `${sender_name} <${sender_email}>`;
        let mailOptions = {
          from: from,
          to: recipient_email,
          cc: [],
          bcc: [],
          subject: subject,
          html: body,
        };

        let transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: process.env.USER,
            pass: process.env.PASSWORD
          }
        });

        transporter.sendMail(mailOptions, function (err, info) {
          if (err) {
            res.status(500).send({
              status: 'failed',
              data: {message: 'An unknown error occured!'}
            });
            debug(err);
          }
          debug(`Email sent: ${info.response}`);
          res.status(200).json({ status: 'success', data: {message: 'mail sent successfully'} });
        })
        //
        }
      } catch (err) {
        debug(err.stack)
      }
    }());
  }

  return {
    sendMail,
    sendMailWithTemplate
  };
}

module.exports = mailingController