const express = require('express');
const mailingRouter = express.Router();
const mailingController = require('../controller/mailingController')

function router() {
  const { sendMail, sendMailWithTemplate } = mailingController()

  mailingRouter.route('/sendmail').post(sendMail)
  mailingRouter.route('/sendmailwithtemplate').post(sendMailWithTemplate)

  return mailingRouter
}

module.exports = router;
