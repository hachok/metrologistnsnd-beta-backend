import { GraphQLServer } from 'graphql-yoga'
import { prisma } from './generated/prisma-client'
import resolvers from './resolvers'

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: request => ({
    ...request,
    resolverValidationOptions: { requireResolversForResolveType: false,},
    prisma,
  }),
})
const opts = {
  port: 4000,
  cors:{
    origin:{['https://metrologistnsnd-beta-backend.herokuapp.com/login']}
  }
 
};
server.start(opts,() => console.log(`Server is running on http://localhost:4000`));
