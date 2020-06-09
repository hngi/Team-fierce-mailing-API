const express = require('express');
const mailingRouter = express.Router();
const mailingController = require('../controller/mailingController');
const { sendMailSchema } = require('../validation/mail.validation');
const validator = require('../middleware/validator');

function router() {
  const { sendMail, sendMailWithTemplate } = mailingController();

  mailingRouter.route('/sendmail').post(validator(sendMailSchema), sendMail);
  mailingRouter
    .route('/sendmailwithtemplate')
    .post(validator(sendMailSchema), sendMailWithTemplate);

  return mailingRouter;
}

module.exports = router;
