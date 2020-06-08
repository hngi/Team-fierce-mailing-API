const debug = require('debug')('app:mailingController');
const nodemailer = require('nodemailer');

function mailingController() {
  function sendMail(req, res) {
    (async function mail() {
      try {
        let { recipients, subject, body, cc, bcc } = req.body
        debug(recipients, subject, body)
        if (!recipients || !subject || !body) {
          res.status(400).send({
            status: false,
            message: 'These fields are required'
          })
          return
        }

        let mailOptions = {
          from: 'kay.nazirite@gmail.com',
          to: recipients,
          bcc: [],
          subject: subject,
          text: body,
          html: `<h1>Lets see how this works</h1>
            <p>get your <a href="https://google.com"><strong>Email</strong></a> today</p>`,
          amp: ``,
          attachments: [
            {
              filename: 'Azumini River',
              path: 'https://res.cloudinary.com/lollykrown/image/upload/v1587044018/Tourist/azumini_river/azumini1.jpg'
            }
          ]
        };

        let transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: '',
            pass: ''
          }
        });

        transporter.sendMail(mailOptions, function (err, info) {
          if (err) debug(err);
          debug(`Email sent: ${info.response}`);
          res.status(200).json({ info });
        })

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
            status: false,
            message: 'These fields are required'
          })
          return
        }

        let mailOptions = {
          from: 'kay.nazirite@gmail.com',
          to: recipients,
          bcc: [],
          subject: subject,
          // html: `<h1>Lets see how this works</h1>
          //   <p>get your <a href="https://google.com"><strong>Email</strong></a> today</p>`,
          html: body,
        };

        let transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: '',
            pass: ''
          }
        });

        transporter.sendMail(mailOptions, function (err, info) {
          if (err) debug(err);
          debug(`Email sent: ${info.response}`);
          res.status(200).json({ info });
        })

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