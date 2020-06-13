const mysql      = require('mysql');

exports.getConnection = () => {
        return mysql.createConnection({
        host     : process.env.DBHOST,
        user     : process.env.DBUSER,
        password : process.env.DBPASS,
        database : process.env.DB
        });
                 
}