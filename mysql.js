require('dotenv').config();
var mysql      = require('mysql');

var connection = mysql.createConnection({
    host     : process.env.CLEARDB_DATABASE_URL,
    //port     : process.env.MYSQL_PORT,
    user     : process.env.MYSQL_USER,
    password : process.env.MYSQL_PASS,
    database : process.env.MYSQL_DB
});

// host     : 'localhost',
//     port     : '3306',

// var pool  = mysql.createPool({
//     connectionLimit : 10,
//     host            : 'localhost',
//     user            : '-',
//     password        : '-',
//     database        : '-'
// });

connection.connect();

// connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
//     if (error) throw error;
//     console.log('The solution is: ', results[0].solution);
// });

// connection.end();

// const mysql = new Promise((res, rej) => {
//     res(1);
// })

// function mysqlq(q) {
//     console.log("Connecting to MySQL...")
//     return new Promise((resolve, reject) => {
//         connection.query(q, function (error, results, fields) {
//             //console.log("test before")
//             if (error) throw error;
//             // console.log(error)
//             // console.log(results)
//             console.log(fields)
//             console.log("Connected.")
//             //return results
//             fields
//             //console.log('The solution is: ', results[0].solution);
//         })
//     })
// }

function query(queryString, params) {
    return new Promise((resolve, reject) => {
        connection.query(queryString, params, function(err, result) {
            if (err) {
                return reject(err);
            }
            console.log("MySql connected.")
            return resolve(result)
        });
    })
}

module.exports = query;