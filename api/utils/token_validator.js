//const {getConnection} = require('./db_connector');
//const connection = getConnection();
const Database = require('../utils/db_class');
const DB = new Database();


exports.validateToken = (acc_id, token) => {
    let sql = 'SELECT * FROM users WHERE account_id = ?';
    DB.query(sql, [acc_id])
        .then(rows=>{
            if(rows.length > 0){
                if(token == rows[0].token){
                    console.log('user located!');
                    return new Promise((resolve, reject)=>reject(true))
                }
                else{
                    return new Promise((resolve, reject)=>reject(false))
                }
            }
        }, err=>{
            return new Promise((resolve, reject)=>reject(err))
        })
        .catch(err=>{
            return err;
        })
    
}