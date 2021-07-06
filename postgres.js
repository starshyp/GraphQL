const { Client } = require('pg')
const client = new Client({
    host: 'localhost',
    port: 5334,
    user: 'postgres',
    password: 'codeboxx',
    database: 'datawarehouse_development'
})