var mysql = require('mysql');

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'password',
    database : 'cvsTesting'
  });

const sqlQuery = (sql) =>  {
  return new Promise(function(reject, resolve) {
    connection.query(sql, function (error, results, fields) {
      if (error) {
        reject(console.log(error));
      } else {
        console.log(results);
        resolve(results.insertId);
      }
    });
  })
}

module.exports = {
  addUser: async function (phone, carrier) {
    const sql = `INSERT INTO user (Phone, Carrier) VALUES ('${phone}', '${carrier}')`;
    sqlQuery(sql).then((id) => {
      return id;
    }).catch((err) => console.log(err));
  }
}
