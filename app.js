// const express = require('express');
// const graphqlHTTP = require('express-graphql');
// const schema = require('./schema')
//
// const app = express();
//
// app.use('/graphql', graphqlHTTP({
//     schema,
//     graphiql: true
// }));
//
// const PORT = process.env.PORT || 4000;
//
// app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
//
// ///////////// MYSQL CONNECTION /////////////
// var mysql      = require('mysql');
// var connection = mysql.createConnection({
//     host     : 'localhost',
//     user     : 'root',
//     password : 'codeboxx',
//     database : 'rocket_development'
// });
//
// connection.connect();
//
// connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
//     if (error) throw error;
//     console.log('The solution is: ', results[0].solution);
// });
//
// connection.end();
//
// ///////////// POSTGRES CONNECTION /////////////
// const { Client } = require('pg')
// const client = new Client({
//     host: 'localhost',
//     port: 5334,
//     user: 'postgres',
//     password: 'codeboxx',
//     database: 'datawarehouse_development'
// })