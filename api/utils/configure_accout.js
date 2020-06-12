exports.configureAccount = (account_id, protocol) => {
    let sql = `UPDATE users
    SET protocol = ?
    WHERE account_id = ?`;

    connection.query(sql,[protocol, account_id], function (error, results, fields) {
      if (error) {
        return false
        }
    });
    return true
}