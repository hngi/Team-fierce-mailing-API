const debug = require("debug")("app:mailingController");
const nodemailer = require("nodemailer");
const emailValidate = require("../utils/mail_validator");

function mailingController() {
  function sendMail(req, res) {
    (async function mail() {
      try {
        let { recipients, subject, body, cc, bcc } = req.body;
        debug(recipients, subject, body);
        if (!recipients || !subject || !body) {
          res.status(400).send({
            status: false,
            message: "These fields are required",
          });
          return;
        }
        let invalidemails = false; //check to determine if there were any invalid emails

        if (emailValidate(recipients) == false) {
          invalidemails = true; //if email not valid set invalid email to true
          res.status(400).json({
            status: false,
            message: "recipients email but be a valid email address",
          });
          return;
        }

        if (cc) {
          // if cc accepts an array of emails
          cc.forEach((email) => {
            if (emailValidate(email) == false) {
              invalidemails = true; //if email not valid set invalid email to true
              return res.status(400).json({
                status: false,
                message: "cc emails but be a valid email addresses",
              });
            }
          });
        }
        if (bcc) {
          // if bcc accepts an array of emails
          bcc.forEach((email) => {
            if (emailValidate(email) == false) {
              invalidemails = true; //if email not valid set invalid email to true
              res.status(400).json({
                status: false,
                message: "bcc emails but be a valid email addresses",
              });
              return;
            }
          });
        }

        //if cc and bcc fields accept only one email
        //if (cc) {
        //  if (emailValidate(cc) == false) {
        //  invalidemails = true; //if email not valid set invalid email to true
        //    res.status(400).json({
        //      status: false,
        //      message: "cc email must be a vlaid email",
        //    });
        //    return;
        //  }
        //}
        //if (bcc) {
        //  if (emailValidate(bcc) == false) {
        //  invalidemails = true; //if email not valid set invalid email to true
        //    res.status(400).json({
        //      status: false,
        //      message: "bcc email must be a vlaid email",
        //    });
        //    return;
        //  }
        //}
        let mailOptions = {
          from: "Team Fierce Mailing API <kay.nazirite@gmail.com>",
          to: recipients,
          cc: cc, //change allows multiple emails in cc array
          bcc: bcc, //change allows multiple emails in bcc array
          subject: subject,
          text: body,
        };

        let transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: process.env.USER,
            pass: process.env.PASSWORD,
          },
        });
        if (invalidemails == false) {
          //if there are any invalid emails prevent sending of any email
          transporter.sendMail(mailOptions, function (err, info) {
            if (err) debug(err);
            debug(`Email sent: ${info.response}`);
            res.status(200).json({
              status: "success",
              data: { message: "mail sent successfully" },
            });
          });
        }
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
        if (!recipients || !subject || !body) {
          res.status(400).send({
            status: false,
            message: "These fields are required",
          });
          return;
        }
        let invalidemails = false; //check to determine if there were any invalid emails
        // if (recipients.match(mailFormat)) {
        //   res.json({msg: true})
        //   res.status(400).send({
        //     status: false,
        //     message: 'Please input a valid email'
        //   })
        //   return
        // }
        if (emailValidate(recipients) == false) {
          invalidemails = true; //if email not valid set invalid email to true
          res.status(400).json({
            status: false,
            message: "recipients email but be a valid email address",
          });
          return;
        }

        if (cc) {
          // if cc accepts an array of emails
          cc.forEach((email) => {
            if (emailValidate(email) == false) {
              invalidemails = true; //if email not valid set invalid email to true
              res.status(400).json({
                status: false,
                message: "cc emails but be a valid email addresses",
              });
              return;
            }
          });
        }
        if (bcc) {
          // if bcc accepts an array of emails
          bcc.forEach((email) => {
            if (emailValidate(email) == false) {
              invalidemails = true; //if email not valid set invalid email to true
              res.status(400).json({
                status: false,
                message: "bcc emails but be a valid email addresses",
              });
              return;
            }
          });
        }

        //if cc and bcc fields accept only one email
        //if (cc) {
        //  if (emailValidate(cc) == false) {
        //  invalidemails = true; //if email not valid set invalid email to true
        //    res.status(400).json({
        //      status: false,
        //      message: "cc email must be a vlaid email",
        //    });
        //    return;
        //  }
        //}
        //if (bcc) {
        //  if (emailValidate(bcc) == false) {
        //  invalidemails = true; //if email not valid set invalid email to true
        //    res.status(400).json({
        //      status: false,
        //      message: "bcc email must be a vlaid email",
        //    });
        //    return;
        //  }
        //}
        let mailOptions = {
          from: "Team Fierce Mailing API <kay.nazirite@gmail.com>",
          to: recipients,
          bcc: [],
          subject: subject,
          html: body,
        };

        let transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: process.env.USER,
            pass: process.env.PASSWORD,
          },
        });
        if (invalidemails == false) {
          //only send emails if there are no invalid emails in any field
          transporter.sendMail(mailOptions, function (err, info) {
            if (err) debug(err);
            debug(`Email sent: ${info.response}`);
            res.status(200).json({
              status: "success",
              data: { message: "mail sent successfully" },
            });
          });
        }
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
