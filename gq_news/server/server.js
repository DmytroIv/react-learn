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

