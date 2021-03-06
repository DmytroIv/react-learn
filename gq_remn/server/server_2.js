import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser'
import {graphqlHTTP} from 'express-graphql';
import {buildSchema} from 'graphql';
import {default as expressPlayground} from 'graphql-playground-middleware-express';
import mongoose from 'mongoose';

//
import User from './models/user';
//

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use('/graphql', graphqlHTTP({
  schema: buildSchema(`
    type RootQuery {
      user(id: ID!): User!
    }
    
    type RootMutation {
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
      query: RootQuery
      mutation: RootMutation
    }
  `),
  rootValue: {
    //
    user: async (args) => {
      try {
        const user = await User.findOne({_id: args.id});
        return {...user._doc};
      } catch (err) {
        throw err;
      }
    },
    //
    addUser: async (args) => {
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
  },
  graphiql: true
}));

app.get('/playground', expressPlayground({endpoint: '/graphql'}));

// mongodb+srv://graphqluser:<password>@cluster0.uoiym.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
mongoose.connect(`mongodb+srv://graphqluser:Qwe123456@cluster0.uoiym.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  app.listen(PORT, () => {
    console.log(`Running on port ${PORT} ...`);
  });
}).catch(err => {
  console.log(err);
});