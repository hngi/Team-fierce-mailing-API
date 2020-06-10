const validator = require("email-validator");
 
exports.validateEmail = (emails)=>{
    const emailList = emails.split(',');
    for(email of emailList){
        if(!validator.validate(email))
        return false
    }
    return true;
}