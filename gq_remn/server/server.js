import {ApolloServer, gql} from 'apollo-server';
import mongoose from 'mongoose';
import User from "./models/user";
//
const PORT = process.env.PORT || 5000;
//
const typeDefs = gql`
    type Query {
        user(id: ID!): User!
    }

    type Mutation {
        addUser(userInput: UserInput!): User!
    }

    type User {
        _id: ID!
        email: String!
        password: String!
    }

    input UserInput {
        email: String!
        password: String!
    }

    schema {
        query: Query
        mutation: Mutation
    }
`;

const resolvers = {
  Query: {
    user: async (parent, args, context, info) => {
      try {
        const user = await User.findOne({_id: args.id});
        return {...user._doc};
      } catch (err) {
        throw err;
      }
    },
  },
  Mutation: {
    addUser: async (parent, args, context, info) => {
      try {
        const user = new User({
          email: args.userInput.email,
          password: args.userInput.password
        });

        const result = await user.save();

        return {
          ...result._doc
        }
      } catch (err) {
        throw err;
      }
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers
});

//
mongoose.connect(`mongodb+srv://graphqluser:Qwe123456@cluster0.uoiym.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  server.listen(PORT, () => {
    console.log(`Running on port ${PORT} ...`);
  });
}).catch(err => {
  console.log(err);
});