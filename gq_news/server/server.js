import express from 'express';
import {ApolloServer} from "apollo-server-express";
import {connect} from 'mongoose';

//
import typeDefs from "./graphql/schema";
import resolvers from "./graphql/resolvers";

const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({req, res}) => {

    req.headers.authorization = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDQzZGZmM2Q0NTk5ZDE3NGM2YjAwMjMiLCJlbWFpbCI6ImNvbUBjb20uY29tIiwiaWF0IjoxNjE1MTAxMzAwLCJleHAiOjE2MTU3MDYxMDB9.6Du0oXzAgIqdzo5QFBrUwuYs-8IdSgK7LJ_CquRTr6o';

    return {req};
  }
});

server.applyMiddleware({
  app
});

const PORT = process.env.PORT || 5000;

connect(`mongodb+srv://graphqluser:Qwe123456@cluster0.uoiym.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}).then(() => {

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch((err) => {
  console.error(err);
});

