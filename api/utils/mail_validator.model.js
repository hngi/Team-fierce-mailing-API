const sendMailSchema = (Joi) => Joi.object({
  from: Joi.string().required(),
  recipient: Joi.string().email().required(),
  cc: Joi.array()
    .items(Joi.string().email()) .sparse(),

  bcc: Joi.array()
    .items(Joi.string().email()) .sparse(),

  subject: Joi.string(),
  text: Joi.string().required()
});

const sendMailWithTemplateSchema = (Joi) => Joi.object({
  from: Joi.string().required(),
  recipient: Joi.string().email().required(),
  bcc: Joi.array()
    .items(Joi.string().email()).sparse(),

  subject: Joi.string(),
  html: Joi.string()
});

module.exports = {
  sendmail : sendMailSchema,
  sendmailwithtemplate: sendMailWithTemplateSchema
};

