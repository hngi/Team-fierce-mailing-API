exports.validateToken = (acc_id, token) => {
    let sql = 'SELECT * FROM users WHERE account_id = ?';

    connection.query(sql, [acc_id], function (error, results, fields) {
        if (error) {
            return false
        }else{
          if(results.length >0){
              if(token == results[0].token){
                    return true
                }
            }
        }
    });
    return false
}