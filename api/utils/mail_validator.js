const validator = require("validator");

const emailValidator = (email) => {
  const re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  if (
    re.test(String(email).toLowerCase()) == true &&
    validator.isEmail(email) == true
  ) {
    return true;
  } else {
    return false;
  }
};

module.exports = emailValidator;
