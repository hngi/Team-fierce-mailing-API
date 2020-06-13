const {createAccount} = require('../utils/create_user');
const {validateEmail} = require('../utils/mail_validator');
const {generateId, generateToken} = require('../utils/generate_string');
const {validateToken} = require('../utils/token_validator');
const {configureAccount} = require('../utils/configure_accout');
//const debug = require('debug')('app:userController');

exports.createUser = (req,res,next) => {
    const {name, email, organisation} = req.body;
    if (!name || !email || !organisation) {
        res.status(400).send({
          status: 'failed',
          data: {message: 'Add name, email and organisation.'}
        })
        return
      }

      let emailsAreValid = validateEmail(email);
        if(!emailsAreValid){
          res.status(400).send({
            status: 'failed',
            data: {message: 'Invalid email!'}
          })
          return
        }     
        
        let user_id = generateId(5);
        let token = generateToken(15);
        if(createAccount(email,name,organisation,user_id,token)){
            res.status(201).send({
                status: 'success',
                data: {message: 'account created!', account_id:user_id,access_token:token}
              })
              return
        }else{
            res.status(500).send({
                status: 'failed',
                data: {message: 'unknown error!'}
              })
              return
        }
}

exports.configureUser = (req, res, next) => {
    const {protocol, account_id, access_token} = req.body;
    if(!validateToken(account_id, access_token)){
        res.status(403).send({
          status: 'error',
          data: {message: 'Access Denied.'}
        })
        return 
      } 
      if(configureAccount(account_id,protocol)){
        res.status(200).send({
            status: 'success',
            data: {message: 'protocol updated!'}
          })
          return
      }
      else{
        res.status(500).send({
            status: 'error',
            data: {message: 'Unknown.'}
          })
          return 
      }
}