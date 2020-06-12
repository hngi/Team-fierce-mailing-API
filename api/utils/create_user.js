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
        return false
      }
      else{
        return true
      }
    });

    return false 
}