const {getConnection} = require('./db_connector');
const connection = getConnection();

exports.createAccount = (email, name, organisation, id, token, protocol='SMTP') => {
    let users={
        "name": name,
        "email": email,
        "organisation": organisation,
        "account_id": id,
        "token":token,
        "protocol": protocol
    }
     
    connection.query('INSERT INTO users SET ?',users, function (error, results, fields) {
      if (error) {
        console.log('DB Error: '+error);
         
        return false
      }       
    });
     
    return true 
}