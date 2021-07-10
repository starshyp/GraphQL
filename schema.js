// const axios = require('axios');
// const express = require('express');
//const { ApolloServer, gql } = require('apollo-server-express');

var express = require('express');
// const app = express();
//let port = process.env.PORT || 4000;
var { graphqlHTTP } = require('express-graphql');
var { buildSchema } = require('graphql');
var mysql = require('./mysql.js');
var pg = require('./postgres.js');

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
    
    getContacts(id: Int!): Fact_Contact
    getCustomerInfo(id: Int): Building
    
    employees(id: Int!): Employee
    buildings(id: Int!): Building
    interventions(id: Int): Intervention
  }
  
  type Fact_Contact {
    ContactId: Int
    CreationDate: DateTime
    CompanyName: String
    Email: String
    ProjectName: String
    address: Address
    building: Building
    building_details: [Building_Detail]
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
    building_details: [Building_Detail]
    interventions: [Intervention]
    fact_contact: [Fact_Contact]
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
    employeeid: Int!
    buildingid: Int!
    batteryid: Int
    columnid: Int
    elevatorid: Int
    building_details: [Building_Detail]
    start_date: DateTime!
    end_date: DateTime
    result: String!
    report: String
    status: String!
    address: Address
    id: Int!
  }
`);

// The root provides a resolver function for each API endpoint
var root = {

    // /////////// TESTING ///////////
    // getBuildings: async ({id}) => {
    //     console.log(id)
    //     let ferrari = await mysql('SELECT * FROM buildings where id = ' + id);
    //     console.log(await ferrari);
    //     return ferrari[0];
    // },
    //
    // getContacts: async ({id}) => {
    //     console.log(id)
    //     let contact1 = await pg('SELECT * FROM fact_contacts where id=1');
    //     console.log(await contact1)
    //     console.log("TEST//////////////////")
    //     return contact1[0];
    //
    // },
    //
    //     hello: () => {
    //     return 'Hello world!';
    // },
    // /////////////////////////////////

    // Retrieving the address of the building, the beginning and the end of the intervention for a specific intervention.
    interventions: async ({id}) => {
        var bentley = await pg(
            'SELECT * FROM factintervention WHERE id = ' + id
        )
        console.log("bentley >>>>>>>>>>>>>")
        console.log(bentley);
        supercar = bentley[0]
        //return bentley[0]

        var huracan = await mysql(
            'SELECT * FROM addresses JOIN buildings on buildings.address_id = addresses.id WHERE buildings.id = ' + supercar.buildingid
        )
        console.log("huracan >>>>>>>>>>>>>")
        console.log(huracan)
        //supercar = huracan[0]
        supercar["address"] = huracan[0]

        console.log("///////// FINISH LINE /////////")
        return supercar;
    },

    //Retrieving customer information and the list of interventions that took place for a specific building
    buildings: async ({id}) => {
        var ferrari = await mysql(
            'SELECT * FROM buildings WHERE id = ' + id
        )
        console.log("ferrari >>>>>>>>>>>>")
        console.log(ferrari);
        supercar = ferrari[0]
        //return getBuildings;

        var lambo  = await pg(
            'SELECT * FROM factintervention WHERE buildingid = ' + id
        )
        console.log("lambo >>>>>>>>>>>>>>>")
        console.log(lambo);
        //supercar["factintervention"] = lambo

        var bugatti = await mysql(
            'SELECT * FROM customers WHERE id = ' + supercar.customer_id
        )
        console.log("bugatti >>>>>>>>>>>>>")
        console.log(bugatti);
        supercar["customer"] = bugatti[0]
        supercar["interventions"] = lambo

        console.log("///////// FINISH LINE /////////")
        return supercar;

    },

    // Retrieval of all interventions carried out by a specified employee with the buildings associated with these interventions including the details (Table BuildingDetails) associated with these buildings.
    //
    // buildings >> building details >>= interventions >>= employees

    employees: async ({id}) => {
        var porsche = await mysql (
            'SELECT * FROM employees WHERE id = ' + id
        )
        console.log("porsche >>>>>>>>>>>>>");
        console.log(porsche);
        supercar = porsche[0]

        var lotus = await pg(
            'SELECT * FROM factintervention WHERE employeeid = ' + id //CHANGE
        )
        console.log("lotus >>>>>>>>>>>>>");
        console.log(lotus);
        supercar2 = lotus[0]

        // var rollsroyce = await mysql(
        //     'SELECT * FROM buildings WHERE id = ' + id
        // )
        // console.log("rolls royce >>>>>>>>>>>>");
        // console.log(rollsroyce);
        // supercar = rollsroyce[0]

        let b;
        for (b = 0; b < lotus.length; b++) {
            var maybach = await mysql(
                'SELECT * FROM building_details WHERE building_id = ' + lotus[b].buildingid
            )
            lotus[b]["building_details"] = maybach
            console.log("maybach >>>>>>>>>>>>>");
            console.log(maybach);
        }
        supercar["interventions"] = lotus

        console.log("///////// FINISH LINE /////////")
        return supercar;
    }

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
app.listen(process.env.PORT || 4000);
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