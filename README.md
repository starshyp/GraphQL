# Rocket Elevators GraphQL
### Website: https://rocketapis.herokuapp.com/graphql

### What is GraphQL?

GraphQL is an open-source data query and manipulation language for APIs, and a runtime for fulfilling queries with existing data.

### How to use

You can go to the website (link above) and run the following queries:

####Question 1: 
Retrieving the address of the building, the beginning and the end of the intervention for a specific intervention.
```json

```

####Question 2:
Retrieving customer information and the list of interventions that took place for a specific building
```json

```

####Question 3:
Retrieval of all interventions carried out by a specified employee with the buildings associated with these interventions including the details (Table BuildingDetails) associated with these buildings.
```json

```

### Node modules installed and used

```bash
"dotenv": "^10.0.0",
"express": "^4.17.1",
"express-graphql": "^0.12.0",
"graphql": "^15.5.1",
"mysql": "^2.18.1",
"pg": "^8.6.0"
```

### DB Connection Implementation
*mysql.js*
```javascript
require('dotenv').config();
var mysql      = require('mysql');

var connection = mysql.createConnection({
    host     : process.env.MYSQL_HOST,
    port     : process.env.MYSQL_PORT,
    user     : process.env.MYSQL_USER,
    password : process.env.MYSQL_PASS,
    database : process.env.MYSQL_DB
});

connection.connect();

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
```
*postgres.js*
```javascript
require('dotenv').config();
const { Client } = require('pg')

const client = new Client({
    host     : process.env.PG_HOST,
    port     : process.env.PG_PORT,
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
```

### Notes
No notes.