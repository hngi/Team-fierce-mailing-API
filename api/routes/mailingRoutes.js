const express = require('express');
const mailingRouter = express.Router();
const nodemailer = require('nodemailer');
const debug = require('debug')('app:mailingRoutes');
const chalk = require('chalk');


function router() {
  mailingRouter.route('/')
    .get((req, res) => {
      (async function mailer() {
        try {
          let mailOptions = {
            from: 'lollykrown@gmail.com',
            to: 'Undisclosed recipients<lollykrown@gmail.com>',
            bcc: ['joe_kayu@yahoo.com', 'lollykrown@live.com'],
            subject: 'Nodemailer Test with Bcc',
            html: `<h1>Lets see how this works</h1>
            <p>get your <a href="https://google.com"><strong>Email</strong></a> today</p>`,
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

          //cron.schedule('* * * * *', () => {
            transporter.sendMail(mailOptions, function (err, info) {
              if (err) debug(err);
              debug(chalk.red(`Email sent: ${info.response}`));
              res.json(info);
            })
          //});
        } catch (e) {
          console.log(e);
        }
      }());
    });
  return mailingRouter
}

module.exports = router;
