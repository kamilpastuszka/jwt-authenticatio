import { ApolloServer } from "apollo-server-express";
import express from "express";
import { typeDefs } from "./typeDefs";
import { resolvers } from "./resolvers";
import bodyParser from "body-parser";

const server = new ApolloServer({
  typeDefs,
  resolvers
});

const app = express();

app.use(bodyParser.json());

server.applyMiddleware({ app });

app.listen(4000, () => {
  console.log("server is listening on port 4000");
});
