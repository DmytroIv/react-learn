import {Schema, model} from 'mongoose';

const postSchema = Schema({
  title: {
    required: true,
    type: String,
    maxlength: 200
  },
  excerpt: {
    required: true,
    type: String,
    maxlength: 500
  },
  content: {
    required: true,
    type: String,
    maxlength: 500000
  },
  author: {
    required: true,
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  status: {
    type: String,
    required: true,
    default: 'DRAFT',
    enum: ['DRAFT', 'PUBLIC']
  },
  categories: {
    required: true,
    // type: [Schema.Types.ObjectId],
    type: Schema.Types.ObjectId,
    ref: 'Category'
  }
}, {timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}});

const Post = model('Post', postSchema);

export default Post;
