const {createAccount} = require('../utils/create_user');
const {validateEmail} = require('../utils/mail_validator');
const {generateId, generateToken} = require('../utils/generate_string');
 
//const {getConnection} = require('../utils/db_connector');
//const connection = getConnection();
const Database = require('../utils/db_class');
const DB = new Database();

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
                status: 'error',
                data: {message: 'error creating account!'}
              })
              return
        }
}

exports.configureUser = (req, res, next) => {
    const {protocol, account_id, access_token} = req.body;
    //
    let sql = 'SELECT * FROM users WHERE account_id = ?';
    let sql2 = `UPDATE users
                            SET protocol = ?
                            WHERE account_id = ?`;
    DB.query(sql, [account_id])
        .then(rows =>{
            if(rows.length>0){
                console.log('User Exist with token: ~');
                console.log(rows[0].token);
                if(access_token == rows[0].token){
                     
                    return DB.query(sql2,[protocol,account_id]);
                }
                else{
                    return new Promise((resolve, reject)=>reject('Invalid Token')) 
                }
            }
            return new Promise((resolve, reject)=>reject('Invalid ID'))
        }, err => {
            //return DB.close().then( () => { throw err; } )
            return new Promise((resolve, reject)=>reject(err))
        } )
        .then(rows => {
            res.status(200).send({
                status: 'success',
                data: {message: 'protocol updated!'}
              })
              return
        }, err => {
            return new Promise((resolve, reject)=>reject(err))
        })
        .catch(err => {
            console.log('DB Error: '+err);
            res.status(500).send({
                status: 'error',
                data: {message: err}
              })
              return
        })


    //////////////
    
        
}