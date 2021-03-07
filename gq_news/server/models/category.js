import {Schema, model} from 'mongoose';

const categorySchema = Schema({
  name: {
    required: true,
    type: String,
    trim: true,
    unique: true,
    lowercase: true,
    maxlength: 250,
  },
  author: {
    required: true,
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
}, {timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}});

const Category = model('Category', categorySchema);

export default Category;
