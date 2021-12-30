var mysql = require('mysql');

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'password',
    database : 'cvsTesting'
  });

module.exports = {
    addUser: function (email, carrier) {
			connection.connect();
			
			const sql = `INSERT INTO user (Email, Carrier) VALUES ('${email}', '${carrier}')`;

			connection.query(sql, function (error, results, fields) {
					if (error) throw error;
					console.log(results);
			});
			
			connection.end();
    }
}
