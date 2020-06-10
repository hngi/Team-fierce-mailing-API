const debug = require('debug')('app:mailingController');
const nodemailer = require('nodemailer');
const {validateEmail} = require('../utils/mail_validator');

function mailingController() {
  function sendMail(req, res) {
    (async function mail() {
      try {
        let { recipients, subject, body, cc, bcc } = req.body;
        debug(recipients, subject, body);
        if (!recipients || !subject || !body) {
          res.status(400).send({
            status: 'failed',
            data: {message: 'Add recipients, subject and body.'}
          })
          return
        }
        let emailsAreValid = validateEmail(recipients);
        if(!emailsAreValid){
          res.status(400).send({
            status: 'failed',
            data: {message: 'Invalid email!'}
          })
        }else{
        let mailOptions = {
          from: 'Team Fierce Mailing Service <hngteamfierce@gmail.com>',
          to: recipients,
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
        let { recipients, subject, body, cc, bcc } = req.body
        debug(recipients, subject, body)
        if (!recipients || !subject || !body) {
          res.status(400).send({
            status: 'failed',
            data: {message: 'Add recipients, subject and body.'}
          })
          return
        }

        let emailsAreValid = validateEmail(recipients);
        if(!emailsAreValid){
          res.status(400).send({
            status: 'failed',
            data: {message: 'Invalid email!'}
          })
        }else{
      
        let mailOptions = {
          from: 'Team Fierce Mailing Service <hngteamfierce@gmail.com>',
          to: recipients,
          bcc: [],
          subject: subject,
          html: body
        }

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