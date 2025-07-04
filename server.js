const express = require('express');
const cors = require('cors');  
const { ApolloServer } = require('apollo-server-express');
require('./config/db');

const typeDefs = require('./graphql/schema');
const resolvers = require('./graphql/resolvers');

async function startServer() {
  const app = express();

  app.use(cors());

  const server = new ApolloServer({ typeDefs, resolvers });

  await server.start();
  server.applyMiddleware({ app, path: '/graphql/search/pets' });

  const PORT = process.env.PORT || 3011;
  app.listen(PORT, () =>
    console.log(`GraphQL server ready at http://localhost:${PORT}${server.graphqlPath}`)
  );
}

startServer();
