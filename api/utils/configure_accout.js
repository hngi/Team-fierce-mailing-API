const {getConnection} = require('./db_connector');
const connection = getConnection();

exports.configureAccount = (account_id, u_protocol) => {
    let sql = `UPDATE users
    SET protocol = ?
    WHERE account_id = ?`;
     
    connection.query(sql,[connection.escape(u_protocol), connection.escape(account_id)], function (error, results, fields) {
      if (error) {
        console.log('DB Error: '+error);
        throw error;
        }
    });
     
}