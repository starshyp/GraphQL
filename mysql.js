const mysql      = require('mysql');

const connection = mysql.createConnection({
    host     : 'localhost',
    port     : '3306',
    user     : 'codeboxx',
    password : 'codeboxx',
    database : 'rocket_development'
});

// var pool  = mysql.createPool({
//     connectionLimit : 10,
//     host            : 'localhost',
//     user            : 'codeboxx',
//     password        : 'codeboxx',
//     database        : 'rocket_development'
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
            return resolve(result)
        });
    })
}

module.exports = query;