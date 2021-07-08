require('dotenv').config();
const { Client } = require('pg')

const client = new Client({
    host: 'localhost',
    port: 5432,
    user     : process.env.PG_USER,
    password : process.env.PG_PASS,
    database : process.env.PG_DB
})

client.connect(err => {
    if (err) {
        console.error('PG connection error...', err.stack)
    } else {
        console.log('PG connected.')
    }
})

// function pgq(q) {
//     console.log("Connecting to PG...")
//     return new Promise((resolve, reject) => {
//         client.query(q, function (error, results, fields) {
//             //console.log("test before")
//             if (error) throw error;
//             // console.log(error)
//             console.log(results)
//             console.log(fields)
//             console.log("Connected.")
//             //return results
//             return fields
//             //console.log('The solution is: ', results[0].solution);
//         })
//     })
// }

function query(queryString, params) {
    return new Promise((resolve, reject) => {
        client.query(queryString, params, function(err, result) {
            if (err) {
                return reject(err.stack);
            }
            return resolve(result.rows)
        });
    })
}

module.exports = query;