import User from "../../models/user";
import Category from "../../models/category";
import {sortArgsHelper} from "../../utils/tools";
import Post from "../../models/post";

export default {
  Post: {
    categories: async (parent, args, context, info) => {
      try {
        const categoriesId = parent.categories;

        /*
        const categories = await Category.find({_id: {
          $in: categoriesId
        }});

        return categories;
        */

        const category = await Category.findById({_id: categoriesId});
        return {
          ...category._doc
        }

      } catch (err) {
        throw err;
      }
    },
    author: async (parent, args, context, info) => {
      try {
        const userId = parent.author;
        const user = await User.findOne({_id: userId});

        return {
          ...user._doc,
          password: null
        };
      } catch (err) {
        throw err;
      }
    },
    related: async (parent, {sort}, context, info) => {
      try {
        let sortArgs = sortArgsHelper(sort);

        const userId = parent._id;
        const posts = await Post
          .find({categories: parent.categories})
          .sort([[sortArgs.sortBy, sortArgs.order]])
          .skip(sortArgs.skip)
          .limit(sortArgs.limit);

        return posts;
      } catch (err) {
        throw err;
      }
    },
  }
}