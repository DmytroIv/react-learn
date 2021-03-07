import Query from './query';
import Mutation from './mutation';
import User from "./user";
import Post from "./post";
import Category from "./category";

const resolvers = {
  ...Query,
  ...Mutation,
  ...User,
  ...Post,
  ...Category
}

export default resolvers;