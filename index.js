import { ApolloServer } from "apollo-server-express";
import express from "express";
import { typeDefs } from "./typeDefs";
import { resolvers } from "./resolvers";
import bodyParser from "body-parser";
import mongoose from "mongoose";

const server = new ApolloServer({
  typeDefs,
  resolvers
});

const app = express();

app.use(bodyParser.json());

server.applyMiddleware({ app });

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER}:${
      process.env.MONGO_PASSWORD
    }@cluster1-ydxcw.mongodb.net/test?retryWrites=true&w=majority`
  )
  .then(() => {
    app.listen(4000, () => console.log("server is running on port 3000"));
  })
  .catch(err => {
    console.log(err);
  });
