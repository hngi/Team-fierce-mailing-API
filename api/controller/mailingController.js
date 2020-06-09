const debug = require('debug')('app:mailingController');
const nodemailer = require('nodemailer');


exports.sendMail = async (req, res) => {
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
      from: 'Team Fierce Mailing API <kay.nazirite@gmail.com>',
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
          
      if (err) debug(err);
          // debug(`Email sent: ${info.response}`);
      res.status(200).json({ status: 'success', data: {message: 'mail sent successfully'} });
    })

  } catch (err) {
    debug(err.stack)
  }
}
  


exports.sendMailWithTemplate = async (req, res) => {
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
        // if (recipients.match(mailFormat)) {
        //   res.json({msg: true})
        //   res.status(400).send({
        //     status: false,
        //     message: 'Please input a valid email'
        //   })
        //   return
        // }

    let mailOptions = {
      from: 'Team Fierce Mailing API <kay.nazirite@gmail.com>',
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
      if (err) debug(err);
      debug(`Email sent: ${info.response}`);
      res.status(200).json({ status: 'success', data: {message: 'mail sent successfully'} });
    })

  } catch (err) {
    debug(err.stack)
  }
}

