var mysql = require('mysql');

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'password',
    database : 'cvsTesting'
  });

var sqlQuery = function(sql) {
  connection.connect();

  connection.query(sql, function (error, results, fields) {
    if (error) {
      connection.rollback(function() {
        throw error;
      })
    }
    console.log(results);
  });

  connection.end();
}

module.exports = {
    addUser: function (email, carrier) {
			const sql = `INSERT INTO user (Email, Carrier) VALUES ('${email}', '${carrier}')`;
      sqlQuery(sql);
    }
}
