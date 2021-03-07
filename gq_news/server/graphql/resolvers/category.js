import User from "../../models/user";
import Post from "../../models/post";

export default {
  Category: {
    posts: async (parent, args, context, info) => {
      try {
        const categoryId = parent._id;
        const posts = await Post.find({categories: categoryId});

        return posts;
      } catch (err) {
        throw err;
      }
    },
    author: async (parent, args, context, info) => {
      try {
        const authorId = parent.author;
        const author = await User.findOne({_id: authorId});

        return {
          ...author._doc,
          password: null
        }
      } catch (err) {
        throw err;
      }
    }
  }
}