var mysql = require('mysql');

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'password',
    database : 'cvsTesting'
  });

var sqlQuery = function(sql) {
  connection.query(sql, function (error, results, fields) {
  }).on('error', function(err) {
    console.log(err);
  }).on('result', function(res) {
    console.log(res);
  });
}

module.exports = {
    addUser: function (email, carrier) {
			const sql = `INSERT INTO user (Email, Carrier) VALUES ('${email}', '${carrier}')`;
      sqlQuery(sql);
    }
}
