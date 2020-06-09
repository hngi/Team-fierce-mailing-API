const debug = require('debug')('app:mailingController');
const nodemailer = require('nodemailer');
const { config } = require('dotenv');

config();

function mailingController() {
  function sendMail(req, res) {
    (async function mail() {
      try {
        let { recipients, subject, body, cc, bcc } = req.body;
        debug(recipients, subject, body);

        // request body paarameters now being validated in validation middleware
        // if (!recipients || !subject || !body) {
        //   res.status(400).send({
        //     status: false,
        //     message: 'These fields are required',
        //   });
        //   return;
        // }

        // let mailOptions = {
        //   from: 'Team Fierce Mailing API <kay.nazirite@gmail.com>',
        //   to: recipients,
        //   cc: [],
        //   bcc: [],
        //   subject: subject,
        //   text: body,
        // };

        let mailOptions = {
          from: `Team Fierce Mailing API ${process.env.USER}`,
          to: recipients,
          cc,
          bcc,
          subject,
          text: body,
        };

        // let transporter = nodemailer.createTransport({
        //   service: 'gmail',
        //   auth: {
        //     user: process.env.USER,
        //     pass: process.env.PASSWORD,
        //   },
        // });

        let transporter = nodemailer.createTransport({
          host: 'smtp.gmail.com',
          port: 587,
          secure: false,
          requireTLS: true,
          auth: {
            user: process.env.USER,
            pass: process.env.PASSWORD,
          },
        });

        transporter.sendMail(mailOptions, function(err, info) {
          if (err) {
            debug(err);
            res.status(500).json({
              status: 'error',
              error: {
                message: err.message
              }
            })
          }else {
            debug(`Email sent: ${info.response}`);
            res.status(200).json({
              status: 'success',
              data: { message: 'mail sent successfully' },
            });
          }
        });
      } catch (err) {
        debug(err.stack);
      }
    })();
  }

  function sendMailWithTemplate(req, res) {
    (async function mail() {
      try {
        let { recipients, subject, body, cc, bcc } = req.body;
        debug(recipients, subject, body);

        // request body paarameters now being validated in validation middleware
        // if (!recipients || !subject || !body) {
        //   res.status(400).send({
        //     status: false,
        //     message: 'These fields are required'
        //   })
        //   return
        // }
        // if (recipients.match(mailFormat)) {
        //   res.json({msg: true})
        //   res.status(400).send({
        //     status: false,
        //     message: 'Please input a valid email'
        //   })
        //   return
        // }

        // let mailOptions = {
        //   from: process.env.USER,
        //   to: recipients,
        //   bcc: [],
        //   subject: subject,
        //   html: body,
        // };

        let mailOptions = {
          from: `Team Fierce Mailing API ${process.env.USER}`,
          to: recipients,
          cc,
          bcc,
          subject,
          text: body,
        };

        // let transporter = nodemailer.createTransport({
        //   service: 'gmail',
        //   auth: {
        //     user: process.env.USER,
        //     pass: process.env.PASSWORD,
        //   },
        // });

        let transporter = nodemailer.createTransport({
          host: 'smtp.gmail.com',
          port: 587,
          secure: false,
          requireTLS: true,
          auth: {
            user: process.env.USER,
            pass: process.env.PASSWORD,
          },
        });

        transporter.sendMail(mailOptions, function(err, info) {
          if (err) debug(err);
          debug(`Email sent: ${info.response}`);
          res
            .status(200)
            .json({
              status: 'success',
              data: { message: 'mail sent successfully' },
            });
        });
      } catch (err) {
        debug(err.stack);
      }
    })();
  }

  return {
    sendMail,
    sendMailWithTemplate,
  };
}

module.exports = mailingController;
