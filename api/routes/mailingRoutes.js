module.exports = (router, mailingController) => {
  const { sendMail, sendMailWithTemplate } = mailingController()

  router.route('/sendmail').post(sendMail)
  router.route('/sendmailwithtemplate').post(sendMailWithTemplate)

  return router
};
