const Database = require('../utils/db_class');
const DB = new Database();

module.exports = (req, res, next) => {
    let { recipient_name,recipient_email,sender_name,sender_email, subject, body, account_id, access_token } = req.body;
    if (!account_id || !access_token) {
        res.status(403).send({
          status: 'failed',
          data: {message: 'Access token and Account ID required.'}
        })
        return
      }
    let sql = 'SELECT * FROM users WHERE account_id = ?';
    DB.query(sql, [account_id])
        .then(rows=>{
            if(rows.length > 0){
                if(access_token == rows[0].token){
                    console.log('user located!');
                    next()
                }
                else{
                    return new Promise((resolve, reject)=>reject('Invalid Token'))
                }
            }
            else{
                return new Promise((resolve, reject)=>reject('Invalid ID'))
            }
        }, err=>{
            return new Promise((resolve, reject)=>reject(err))
        })
        .catch(err=>{
            res.status(403).send({
                status: 'error',
                data: {message: err}
              })
        })
}