import {UserInputError, AuthenticationError, ApolloError} from 'apollo-server-express';
import authorize from "../../utils/isAuth";
import {userOwnership} from "../../utils/tools";
import User from '../../models/user';
import Post from "../../models/post";
import Category from "../../models/category";

export default {

  Mutation: {
    authUser: async (parent, args, context, info) => {

      try {
        const user = await User.findOne({
          'email': args.fields.email
        });
        if (!user) {
          throw new AuthenticationError('Email wrong.');
        }

        const checkPass = await user.comparePassword(args.fields.password);
        if (!checkPass) {
          throw new AuthenticationError('Password wrong.');
        }

        const getToken = await user.generateToken();
        if (!getToken) {
          throw new AuthenticationError('Something went wrong, try again.');
        }

        return {
          _id: user._id,
          email: user.email,
          token: getToken.token
        };
      } catch (err) {
        throw err;
      }
    },
    signUp: async (parent, args, context, info) => {

      try {
        const user = new User({
          email: args.fields.email,
          password: args.fields.password
        });

        const getToken = await user.generateToken();
        if (!getToken) {
          throw new AuthenticationError('Something went wrong, try again.');
        }

        return {
          ...getToken._doc
        };
      } catch (err) {

        if (err.code === 11000) {
          throw new AuthenticationError('Sorry, email is duplicated email, try a new email.');
        }

        throw err;
      }
    },
    updateUserProfile: async (parent, args, context, info) => {
      try {
        const req = authorize(context.req);

        if (!userOwnership(req, args._id)) {
          throw new AuthenticationError('You dont own this user');
        }

        ///TODO validate fields ...

        const user = await User.findOneAndUpdate(
          {_id: args._id},
          {
            "$set": {
              name: args.name,
              lastname: args.lastname
            }
          },
          {new: true}
        );

        return {...user._doc};
      } catch (err) {
        throw err;
      }
    },
    updateUserEmailPass: async (parent, args, context, info) => {
      try {
        const req = authorize(context.req);
        if (!userOwnership(req, args._id)) {
          throw new AuthenticationError('You cant change these pass or email, not yours');
        }

        const user = await User.findOne({_id: args._id});
        if (!user) {
          throw new AuthenticationError('User does not exist');
        }

        ///TODO validate fields ...
        if (args.email) {
          user.email = args.email;
        }

        if (args.password) {
          user.password = args.password;
        }

        const getToken = await user.generateToken();
        if (!getToken) {
          throw new AuthenticationError('Something wrong with a new token generation , try again.');
        }

        return {
          ...getToken._doc,
          token: getToken.token
        };
      } catch (err) {
        throw new ApolloError('Something went wrong, try again.', err);
      }
    },
    createPost: async (parent, {fields}, context, info) => {
      try {
        const req = authorize(context.req);
        if (!req) {
          throw new AuthenticationError('You cant create the post, you are not authorized.');
        }

        const post = new Post({
          title: fields.title,
          excerpt: fields.excerpt,
          content: fields.content,
          author: req._id,
          status: fields.status,
          // categories: [...fields.categories]
          categories: fields.categories
        });

        const result = await post.save();

        return {...result._doc};
      } catch (err) {
        throw err;
      }
    },
    updatePost: async (parent, {fields, postId}, context, info) => {
      try {
        const req = authorize(context.req);
        if (!req) {
          throw new AuthenticationError('You cant create the post, you are not authorized.');
        }

        const post = await Post.findOne({_id: postId});
        if (!post) {
          throw new AuthenticationError('Post was not found.');
        }

        if(!userOwnership(req, post.author)) {
          throw new AuthenticationError('Your are not the owner of the post.');
        }

        for (const key in fields) {
          if(fields[key] && post[key] !== fields[key]) {
            post[key] = fields[key];
          }
        }

        const result = await post.save();

        return {...result._doc};
      } catch (err) {
        throw err;
      }
    },
    deletePost: async (parent, {postId}, context, info) => {
      try {
        const req = authorize(context.req);
        if (!req) {
          throw new AuthenticationError('You cant create the post, you are not authorized.');
        }

        const post = await Post.findOne({_id: postId});
        if (!post) {
          throw new AuthenticationError('Post was not found.');
        }

        if(!userOwnership(req, post.author)) {
          throw new AuthenticationError('Your are not the owner of the post.');
        }

        const result = await post.remove();

        return result;
      } catch (err) {
        throw err;
      }
    },
    createCategory: async (parent, {name}, context, info) => {
      try {
        const req = authorize(context.req);
        if (!req) {
          throw new AuthenticationError('You cant create the Category, you are not authorized.');
        }

        /// TODO validate

        const category = new Category({
          name,
          author: req._id,
          posts: []
        });

        const result = await category.save();

        return {...result._doc};
      } catch (err) {
        throw err;
      }
    },
    updateCategory: async (parent, {name, catId}, context, info) => {
      try {
        const req = authorize(context.req);
        if (!req) {
          throw new AuthenticationError('You cant create the post, you are not authorized.');
        }

        const category = await Category.findOne({_id: catId});
        if (!category) {
          throw new AuthenticationError('Post was not found.');
        }

        if(!userOwnership(req, category.author)) {
          throw new AuthenticationError('Your are not the owner of the post.');
        }

        category.name = name.trim();

        const result = await category.save();

        return {...result._doc};
      } catch (err) {
        throw err;
      }
    },
    deleteCategory: async (parent, {catId}, context, info) => {
      try {
        const req = authorize(context.req);
        if (!req) {
          throw new AuthenticationError('You cant create the post, you are not authorized.');
        }

        const category = await Category.findOne({_id: catId});
        if (!category) {
          throw new AuthenticationError('Post was not found.');
        }

        if(!userOwnership(req, category.author)) {
          throw new AuthenticationError('Your are not the owner of the post.');
        }

        const result = await category.remove();

        return {...result._doc};
      } catch (err) {
        throw err;
      }
    },
  }
}