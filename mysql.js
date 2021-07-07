const mysql      = require('mysql');

const connection = mysql.createConnection({
    host     : 'localhost',
    port     : '3306',
    user     : 'codeboxx',
    password : 'codeboxx',
    database : 'rocket_development'
});

// connection.connect();

// connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
//     if (error) throw error;
//     console.log('The solution is: ', results[0].solution);
// });

// connection.end();

// const mysql = new Promise((res, rej) => {
//     res(1);
// })

function mysqlq(q) {
    console.log("Connecting to MySQL...")
    return new Promise((resolve, reject) => {
        connection.query(q, function (error, results, fields) {
            //console.log("test before")
            if (error) throw error;
            console.log("Connected.")
            //console.log('The solution is: ', results[0].solution);
        })
    })
}

module.exports = mysqlq;