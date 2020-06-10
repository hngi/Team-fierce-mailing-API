const Joi = require('@hapi/joi');
const schema = require('./mail_validator.model');


const schemaValidator = (object, type) => {
  return new Promise((resolve, reject) => {
    if (!object) {
      reject(new Error('object to validate not provided'));
    }
    if (!type) {
      reject(new Error('schema type to validate not provided'));
    }

    const {error, value} = schema[type](Joi).validate(object);

    if (error) {
      reject(new Error(`Invalid ${type} data, ${error}`));
    }
    resolve(value);
  });
};

module.exports = Object.create({
  validate: schemaValidator,
  schema
});
