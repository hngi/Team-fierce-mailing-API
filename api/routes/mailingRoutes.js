const express = require('express');
const mailingRouter = express.Router();
const mailingController = require('../controller/mailingController');
const validateToken = require('../middleware/validate_token');

function router() {
  const { sendMail, sendMailWithTemplate } = mailingController()

  mailingRouter.route('/sendmail').post(validateToken, sendMail)
  mailingRouter.route('/sendmailwithtemplate').post(validateToken, sendMailWithTemplate)

  return mailingRouter
}

module.exports = router;
