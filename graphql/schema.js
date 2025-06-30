const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Pet {
    id: ID!
    name: String!
    breed: String
    age: Int
    healthStatus: String
    description: String
    location: String
    images: [String]
  }

  type Query {
    getPetsByBreed(breed: String!): [Pet]
    getPetsByLocation(location: String!): [Pet]
  }
`;

module.exports = typeDefs;
