const { matchedData, validationResult } = require('express-validator');
const ApplicationError = require('../helpers/errors');

/**
 * @description express-validator schema validator
 *
 * @param {Array} schema
 * @param {Number} status - http statusCode
 *
 * @returns {Array} array of validation results and middleware
 */
module.exports = (schemas, status = 400) => {
  const validationCheck = async (request, response, next) => {
    const errors = validationResult(request);
    request = { ...request, ...matchedData(request) };

    if (!errors.isEmpty()) {
      const mappedErrors = Object.entries(errors.mapped()).reduce(
        (accumulator, [key, value]) => {
          accumulator[key] = value.msg;
          return accumulator;
        },
        {}
      );

      const validationErrors = new ApplicationError(
        status,
        'validation error',
        mappedErrors
      );

      return response.status(400).json({
        status: 'error',
        error: {
          validationErrors,
        },
      });
    }

    return next();
  };

  return [...(schemas.length && [schemas]), validationCheck];
};
