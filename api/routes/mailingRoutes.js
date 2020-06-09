const express = require('express');
const router = express.Router();
const {sendMail, sendMailWithTemplate} = require('../controller/mailingController')
const {validateEmail} = require('../utils/mail_validator');

router.post('/sendmail', validateEmail, sendMail);

router.post('/sendmailwithtemplate', validateEmail, sendMailWithTemplate);

module.exports = router;
