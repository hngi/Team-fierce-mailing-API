const { check } = require('express-validator');

const requiredString = 'This field is required';
const emailString = 'Value is not a valid email';

module.exports = {
  sendMailSchema: [
    check('recipients')
      .trim()
      .not()
      .isEmpty()
      .withMessage(requiredString)
      .isEmail()
      .withMessage(emailString),

    check('subject')
      .trim()
      .not()
      .isEmpty()
      .withMessage(requiredString)
      .isString(),

    check('body')
      .trim()
      .not()
      .isEmpty()
      .withMessage(requiredString)
      .isString(),

    check('cc')
      .optional()
      .trim()
      .isEmail()
      .withMessage(emailString),

    check('bcc')
      .optional()
      .trim()
      .isEmail()
      .withMessage(emailString),
  ],
};
