const validator = require("../utils/mail_validator");

const testParamTrue = "test@gmail.com";
const testParamFalse1 = "test.com";
const testParamFalse2 = "test@.com";
const testParamFalse3 = "test@gmail";
const testParamFalse4 = "test@gmail.";

test(`should check to see if ${testParamTrue} is valid `, () => {
  expect(validator(testParamTrue)).toBeTruthy();
});
test(`should check to see if ${testParamFalse1} is valid `, () => {
  expect(validator(testParamFalse1)).not.toBeTruthy();
});
test(`should check to see if ${testParamFalse2} is valid `, () => {
  expect(validator(testParamFalse2)).not.toBeTruthy();
});
test(`should check to see if ${testParamFalse3} is valid `, () => {
  expect(validator(testParamFalse3)).not.toBeTruthy();
});
test(`should check to see if ${testParamFalse4} is valid `, () => {
  expect(validator(testParamFalse4)).not.toBeTruthy();
});
