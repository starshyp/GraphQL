const express = require('express');
const expressGraphQL = require('express-graphql');
const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString
} = require('graphql');
const app = express();

// const schema = new GraphQLSchema({
//     query: new GraphQLObjectType({
//         name: 'Helloworld',
//         fields: () => ({
//             message: { 
//                 type: GraphQLString,
//                 resolve: () => `
//                 scalar Datetime
//                   type Query {
//                     buildings(id: Int): Building
//                     interventions(id: Int): Intervention
//                     employees(id: Int): Employee
//                   }
//                   type Building {
//                     FullNameOfTheBuildingAdministrator: String
//                     EmailOfTheAdministratorOfTheBuilding: String
//                     PhoneNumberOfTheBuildingAdministrator: String
//                     FullNameOfTheTechContactForTheBuilding: String
//                     TechContactEmail: String
//                     TechContactPhone: String
//                     customer_id: Int!
//                     address_id: Int!
//                     address: Address
//                     customer: Customer
//                     buildingdetails: [Building_Detail]
//                     interventions: [Intervention]
//                     id: Int!
//                   }
//                   type Address {
//                     TypeOfAddress: String
//                     Status: String
//                     Entity: String,
//                     NumberAndStreet: String
//                     Apt: String
//                     City: String
//                     PostalCode: String
//                     Country: String
//                     created_at: DateTime
//                     updated_at: DateTime
//                     id: Int!
//                   }
//                   type Customer {
//                     CompanyName: String
//                     NameOfContact: String
//                     CompanyContactPhone: String
//                     EmailOfTheCompany: String
//                     CompanyDescription: String
//                     NameOfServiceTechAuthority: String
//                     TechAuhtorityPhone: String
//                     TechManagerServiceEmail: String
//                     created_at: DateTime
//                     updated_at: DateTime
//                     user_id: Int
//                     address_id: Int
//                     address: [Address]
//                     id: Int!
//                   }
//                   type Employee {
//                     FirstName: String
//                     LastName: String
//                     Title: String
//                     Email: String
//                     created_at: DateTime
//                     updated_at: DateTime
//                     user_id: Int
//                     buildingdetails: [Building_Detail]
//                     interventions: [Intervention]
//                     id: Int!
//                   }
//                   type Building_Detail {
//                     InformationKey: String
//                     Value: String
//                     created_at: String
//                     updated_at: String
//                     building_id: Int
//                     id: Int!
//                   }
//                   type Intervention {
//                     employee_id: Int!
//                     building_id: Int!
//                     building_details: [Building_Detail]
//                     begin_date_time: DateTime!
//                     end_date_time: DateTime
//                     result: String!
//                     report: String
//                     status: String!
//                     id: Int!
//                   }
//                 `);
//         })
//     })
    
// })

// MySQL DB connection
const mysql      = require('mysql');

const connection = mysql.createConnection({
    host     : 'localhost',
    port     : '3306',
    user     : 'codeboxx',
    password : 'codeboxx',
    database : 'rocket_development'
});

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

// //PostgreSQL DB connection
const { Client } = require('pg')
const client = new Client({
    host: 'localhost',
    port: 5334,
    user: 'postgres',
    password: 'codeboxx',
    database: 'datawarehouse_development'
})

// Schema
// Construct a schema, using GraphQL schema language
// var schema = buildSchema(`
// scalar Date
//   type Query {
//     buildings(id: Int): Building
//     interventions(id: Int): Intervention
//     employees(id: Int): Employee
//   }
//   type Building {
//     FullNameOfTheBuildingAdministrator: String
//     EmailOfTheAdministratorOfTheBuilding: String
//     PhoneNumberOfTheBuildingAdministrator: String
//     FullNameOfTheTechContactForTheBuilding: String
//     TechContactEmail: String
//     TechContactPhone: String
//     customer_id: Int!
//     address_id: Int!
//     address: Address
//     customer: Customer
//     buildingdetails: [Building_Detail]
//     interventions: [Intervention]
//     id: Int!
//   }
//   type Address {
//     TypeOfAddress: String
//     Status: String
//     Entity: String,
//     NumberAndStreet: String
//     Apt: String
//     City: String
//     PostalCode: String
//     Country: String
//     created_at: DateTime
//     updated_at: DateTime
//     id: Int!
//   }
//   type Customer {
//     CompanyName: String
//     NameOfContact: String
//     CompanyContactPhone: String
//     EmailOfTheCompany: String
//     CompanyDescription: String
//     NameOfServiceTechAuthority: String
//     TechAuhtorityPhone: String
//     TechManagerServiceEmail: String
//     created_at: DateTime
//     updated_at: DateTime
//     user_id: Int
//     address_id: Int
//     address: [Address]
//     id: Int!
//   }
//   type Employee {
//     FirstName: String
//     LastName: String
//     Title: String
//     Email: String
//     created_at: DateTime
//     updated_at: DateTime
//     user_id: Int
//     buildingdetails: [Building_Detail]
//     interventions: [Intervention]
//     id: Int!
//   }
//   type Building_Detail {
//     InformationKey: String
//     Value: String
//     created_at: String
//     updated_at: String
//     building_id: Int
//     id: Int!
//   }
//   type Intervention {
//     employee_id: Int!
//     building_id: Int!
//     building_details: [Building_Detail]
//     begin_date_time: DateTime!
//     end_date_time: DateTime
//     result: String!
//     report: String
//     status: String!
//     id: Int!
//   }
// `);

// Retrieving the address of the building
async function getInterventions({id}){

    // Query the PostgreSQL address table
    intervention = await query_postgresql(`Selected intervention from building ID`+ id);
    resolve = intervention[0];
    console.log(intervention);

    // Query the MySQL address table
    address = await query_mysql(`Selected address of building ID:` + resolve.building_id);
    resolve['address'] = address[0];
    console.log(intervention);

    return resolve;
}

// // Retrieving customer information and the list of interventions that took place for a specific building
async function getInterventions({id}){

   // Query the PostgreSQL intervention table
    interventions = await query_postgresql(`Selected from intervention where building ID:`+ id);
    console.log(interventions);

    // Query the MySQL building table
    var building = await query_mysql(`Selected customer ID:`+ id);
    resolve = building[0];
    console.log(building);

    // Query customer from MySQL table
    customer = await query_mysql(`Selected customer ID:`+ id);
    resolve['intervention'] = interventions;
    resolve['customer'] = customer[0];
    

    return resolve;
}

// Retrieval of all interventions carried out by a specified employee with the buildings associated with these interventions including the details (Table BuildingDetails) associated with these buildings.
async function getEmployees({id}){

    // Query the Postgres intervention table
    interventions = await query_postgresql(`Selected from intervention where building ID:`+ id);
    result = interventions[0];
    console.log(intervention);
    console.log(interventions);

    // Query the MySQL employees table
    var employees = await query_mysql(`Selected employee ID:`+ id);
    resolve = employees[0];
    console.log(employees);
 
    // Query building_details table in MySQL to get key values
    var i;
    for(i = 0; j < interventions.length; i++) {
    building_details = await query_mysql(`Selected building_details from building ID:`+ intervention[i] + building_id);
    interventions[i]['building_details'] = building_details;
    console.log(building_details);
    }
    resolve['intervention'] = interventions;
     
    return resolve;
}

function query_postsgresql(queryStr){
    console.log('Run PostgresSQL query: ' + quertStr);
    return new Promise((resolve, reject) => {
        _pg.query(queryStr, function(error, result){
            if(error){
                return reject(error);
            }
            return resolve(result);
        });
    });
}

function query_mysql(queryStr){
    console.log('Run SQL query: ' + quertStr);
    return new Promise((resolve, reject) => {
        _mysql.query(queryStr, function(error, result){
            if(error){
                return reject(error);
            }
            return resolve(result);
        });
    });
}

// var app = express();
// app.use('/graphql', graphqlHTTP({
//   schema: schema,
//   rootValue: root,
//   graphiql: true,
// }));
app.listen(4000);
console.log('The GraphQL API server is running at localhost:4000/graphql');