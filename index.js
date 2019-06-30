import { ApolloServer } from "apollo-server-express";
import express from "express";
import { typeDefs } from "./typeDefs";
import { resolvers } from "./resolvers";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import auth from "./middleware/auth";

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, res }) => ({ req, res })
});

const app = express();

app.use(cookieParser());

server.applyMiddleware({ app });

app.use(auth);

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER}:${
      process.env.MONGO_PASSWORD
    }@cluster1-ydxcw.mongodb.net/test?retryWrites=true&w=majority`
  )
  .then(() => {
    app.listen(4000, () => console.log("server is running on port 4000"));
  })
  .catch(err => {
    console.log(err);
  });
