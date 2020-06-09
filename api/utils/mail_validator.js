function validateEmail(emailText) {
  const emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  if (emailText.match(emailFormat)) {
    return true;
  }
  console.log("You have entered an invalid email address!");
  return false;
}

let checkValue = validateEmail("umehvictormariogmail.com");

console.log(checkValue);
