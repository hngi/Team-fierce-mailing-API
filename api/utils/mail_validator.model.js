const sendMailSchema = (Joi) => Joi.object({
  from: Joi.string().required(),
  recipient: Joi.string().email().required(),
  cc: Joi.array()
    .items(Joi.string().email()).sparse(),

  bcc: Joi.array()
    .items(Joi.string().email()).sparse(),

  subject: Joi.string().required(),
  text: Joi.string().required()
});

const sendMailWithTemplateSchema = (Joi) => Joi.object({
  from: Joi.string().required().required(),
  recipient: Joi.string().email().required(),
  bcc: Joi.array()
    .items(Joi.string().email()).sparse(),
    
  cc: Joi.array()
    .items(Joi.string().email()).sparse(),

  subject: Joi.string().required(),
  html: Joi.string().required()
});

module.exports = {
  sendmail : sendMailSchema,
  sendmailwithtemplate: sendMailWithTemplateSchema
};
