// const axios = require('axios');
// const express = require('express');
// const { ApolloServer, gql } = require('apollo-server-express');

var express = require('express');
var { graphqlHTTP } = require('express-graphql');
var { buildSchema } = require('graphql');
var mysql = require('./mysql.js')
var pg = require('./postgres.js')

// import { GraphQLScalarType } from 'graphql';
// import { Kind } from 'graphql/language';
//
// const resolverMap = {
//     DateTime: new GraphQLScalarType({
//         name: 'DateTime',
//         description: 'Date custom scalar type',
//         parseValue(value) {
//             return new Date(value); // value from the client
//         },
//         serialize(value) {
//             return value.getTime(); // value sent to the client
//         },
//         parseLiteral(ast) {
//             if (ast.kind === Kind.INT) {
//                 return parseInt(ast.value, 10); // ast value is always in string format
//             }
//             return null;
//         },
//     }),
// }

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
scalar DateTime

  type Query {
    hello: String
    rollDice(numDice: Int!, numSides: Int): [Int]
    
    getBuildings(id: Int!): Building
    getCustomers(id: Int): Customer
    getInterventions(id: Int): Intervention
  }
  type Building {
    FullNameOfTheBuildingAdministrator: String
    EmailOfTheAdministratorOfTheBuilding: String
    PhoneNumberOfTheBuildingAdministrator: String
    FullNameOfTheTechContactForTheBuilding: String
    TechContactEmail: String
    TechContactPhone: String
    customer_id: Int!
    address_id: Int!
    address: Address
    customer: Customer
    buildingdetails: [Building_Detail]
    interventions: [Intervention]
    id: Int!
  }
  type Address {
    TypeOfAddress: String
    Status: String
    Entity: String,
    NumberAndStreet: String
    Apt: String
    City: String
    PostalCode: String
    Country: String
    created_at: DateTime
    updated_at: DateTime
    id: Int!
  }
  type Customer {
    CompanyName: String
    NameOfContact: String
    CompanyContactPhone: String
    EmailOfTheCompany: String
    CompanyDescription: String
    NameOfServiceTechAuthority: String
    TechAuhtorityPhone: String
    TechManagerServiceEmail: String
    created_at: DateTime
    updated_at: DateTime
    user_id: Int
    address_id: Int
    address: [Address]
    id: Int!
  }
  type Employee {
    FirstName: String
    LastName: String
    Title: String
    Email: String
    created_at: DateTime
    updated_at: DateTime
    user_id: Int
    buildingdetails: [Building_Detail]
    interventions: [Intervention]
    id: Int!
  }
  type Building_Detail {
    InformationKey: String
    Value: String
    created_at: String
    updated_at: String
    building_id: Int
    id: Int!
  }
  type Intervention {
    employee_id: Int!
    building_id: Int!
    building_details: [Building_Detail]
    begin_date_time: DateTime!
    end_date_time: DateTime
    result: String!
    report: String
    status: String!
    id: Int!
  }
`);

// The root provides a resolver function for each API endpoint
var root = {

    /////////// TESTING ///////////
    getBuildings: async ({id}) => {
        let ferrari = await mysql('SELECT * FROM buildings WHERE id =' + id);
        console.log(ferrari);
        //return ferrari;
    },

        hello: () => {
        return 'Hello world!';
    }
    //////////////////////////////

    // // Retrieving the address of the building, the beginning and the end of the intervention for a specific intervention.
    // getInterventions: async ({id}) => {
    //     var bentley = await pg(
    //         'SELECT * FROM factintervention WHERE id = ', [id]
    //     )
    //     console.log(bentley);
    //
    //     var huracan = await mysql(
    //         'SELECT * FROM addresses JOIN buildings on buildings.address_id'
    //     )
    //     console.log(huracan)
    //
    //     return getInterventions;
    // },
    //
    // //Retrieving customer information and the list of interventions that took place for a specific building
    // getBuildings: async ({id}) => {
    //     var ferrari = await mysql(
    //         'SELECT * FROM buildings WHERE id = ', [id]
    //     )
    //     console.log(ferrari);
    //     //return getBuildings;
    //
    //     var lambo  = await pg(
    //         'SELECT * FROM factintervention WHERE building_id = ', [id]
    //     )
    //     console.log(lambo);
    //
    //     var jackiechan = await mysql(
    //         'SELECT * FROM customers WHERE id = ', [id]
    //     )
    //     console.log(jackiechan);
    //
    //     return getBuildings;
    // }

    // Retrieval of all interventions carried out by a specified employee with the buildings associated with these interventions including the details (Table BuildingDetails) associated with these buildings.


    // getCustomers: async ({id}) => {
    //     var customer = await mysql(
    //         `SELECT * FROM customers WHERE id = ?`, [id]
    //     )
    //     return getCustomers;
    // },

}


// exports.getUser = async (client, uuid) => {
//     var user = {};
//     var userFromDb = await client.query(`select id, uuid, name from users where uuid = ?`, [uuid])
//     if (userFromDb.length == 0) {
//         return null;
//     }
//     var postsFromDb = await client.query(`select uuid, text from posts where user_id = ?`, [userFromDb[0].id])
//     user.UUID = userFromDb[0].uuid;
//     user.Name = userFromDb[0].name;
//     if (postsFromDb.length > 0) {
//         user.Posts = postsFromDb.map(function (x) { return { UUID: x.uuid, Text: x.text } });
//     }
//     return user;
// }

///////EXAMPLE OF INPUT
// input UserInput {
//     Name: String
//     Posts: [PostInput]
// }
//
// input PostInput {
//     Text: String
// }

//////EXAMPLE
// var root = {
//     rollDice: ({numDice, numSides}) => {
//         var output = [];
//         for (var i = 0; i < numDice; i++) {
//             output.push(1 + Math.floor(Math.random() * (numSides || 6)));
//         }
//         return output;
//     }
// };



//////EXAMPLE - mutations
// var fakeDatabase = {};
// var root = {
//     setMessage: ({message}) => {
//         fakeDatabase.message = message;
//         return message;
//     },
//     getMessage: () => {
//         return fakeDatabase.message;
//     }
// };

var app = express();
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at http://localhost:4000/graphql');

//////////////////////////////////

// async function startApolloServer() {
//     // Construct a schema, using GraphQL schema language
//     const typeDefs = gql`
//     type Query {
//       hello: String
//     }
//   `;

// const {
//     GraphQLObjectType,
//     GraphQLInt,
//     GraphQLString,
//     DateTime,
//     Address,
//     Customer,
//     Building_Detail,
//     Intervention,
//     GraphQLList,
//     GraphQLSchema
// } = require('graphql');
//
// const Building = new GraphQLObjectType({
//     name: 'Building',
//     fields: () => ({
//         FullNameOfTheBuildingAdministrator: {type: GraphQLString},
//         EmailOfTheAdministratorOfTheBuilding: {type: GraphQLString},
//         PhoneNumberOfTheBuildingAdministrator: {type: GraphQLString},
//         FullNameOfTheTechContactForTheBuilding: {type: GraphQLString},
//         TechContactEmail: {type: GraphQLString},
//         TechContactPhone: {type: GraphQLString},
//         created_at: {type: DateTime},
//         updated_at: {type: DateTime},
//         customer_id: {type: GraphQLInt},
//         address_id: {type: GraphQLInt},
//         address: {type: Address},
//         customer: {type: Customer},
//         buildingdetails: {type: Building_Detail},
//         interventions: {type: Intervention},
//         building_id: {type: GraphQLInt}
//     })
// });
//
// const Address = new GraphQLObjectType({
//     name: 'Address',
//     fields: () => ({
//         TypeOfAddress: {type: GraphQLString},
//         Status: {type: GraphQLString},
//         Entity: {type: GraphQLString},
//         NumberAndStreet: {type: GraphQLString},
//         Apt: {type: GraphQLString},
//         City: {type: GraphQLString},
//         PostalCode: {type: GraphQLString},
//         Country: {type: GraphQLString},
//         created_at: {type: DateTime},
//         updated_at: {type: DateTime}
//     })
// });
//
// const Customer = new GraphQLObjectType({
//     name: 'Customer',
//     fields: () => ({
//         CompanyName: {type: GraphQLString},
//         NameOfContact: {type: GraphQLString},
//         CompanyContactPhone: {type: GraphQLString},
//         EmailOfTheCompany: {type: GraphQLString},
//         CompanyDescription: {type: GraphQLString},
//         NameOfServiceTechAuthority: {type: GraphQLString},
//         TechAuhtorityPhone: {type: GraphQLString},
//         TechManagerServiceEmail: {type: GraphQLString},
//         created_at: {type: DateTime},
//         updated_at: {type: DateTime},
//         user_id: {type: GraphQLInt},
//         address_id: {type: GraphQLInt},
//         address: {type: Address},
//     })
// });
//
// const Employee = new GraphQLObjectType({
//     name: 'Employee',
//     fields: () => ({
//         FirstName: {type: GraphQLString},
//         LastName: {type: GraphQLString},
//         Title: {type: GraphQLString},
//         Email: {type: GraphQLString},
//         created_at: {type: DateTime},
//         updated_at: {type: DateTime},
//         user_id: {type: GraphQLInt},
//         buildingdetails: {type: Building_Detail},
//         interventions: {type: Intervention}
//     })
// });
//
// const Building_Detail = new GraphQLObjectType({
//     name: 'Building_Detail',
//     fields: () => ({
//         InformationKey: {type: GraphQLString},
//         Value: {type: GraphQLString},
//         created_at: {type: GraphQLString},
//         updated_at: {type: GraphQLString},
//         building_id: {type: GraphQLInt}
//     })
// });

// const Intervention = new GraphQLObjectType({
//     name: 'Intervention',
//     fields: () => ({
//
//     })
// });


//////////////////// ROOT QUERY ////////////////////
// const RootQuery = new GraphQLObjectType({
//     name: 'RootQueryType',
//     fields: {
//
//     }
// })
//
//
// axios.get('/user?ID=12345')
//     .then(function (response) {
//         // handle success
//         console.log(response);
//     })
//     .catch(function (error) {
//         // handle error
//         console.log(error);
//     })
//     .then(function () {
//         // always executed
//     });

///////////////////////////////////////////////////