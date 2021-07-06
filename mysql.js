var mysql      = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'codeboxx',
    database : 'rocket_development'
});

connection.connect();

connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
    if (error) throw error;
    console.log('The solution is: ', results[0].solution);
});

connection.end();

// const mysql = new Promise((res, rej) => {
//     res(1);
// })
//
// module.exports = mysql;