import {Schema, model} from 'mongoose';
import validator from "validator";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
//
dotenv.config();
const SALT_I = 10;
//
const userSchema = Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'invalid email']
  },
  password: {
    type: String,
    required: true,
    minlength: 5
  },
  name: {
    type: String,
    maxlength: 100
  },
  lastname: {
    type: String,
    maxlength: 100
  },
  token: {
    type: String
  }
});

//hash password
userSchema.pre('save', function (next) {
  const user = this;

  if (user.isModified('password')) {
    bcrypt.genSalt(SALT_I, function (err, salt) {
      if (err) return next(err);

      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);

        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

//generate token
userSchema.methods.generateToken = async function () {
  const user = this;
  user.token = jwt.sign({_id: user._id, email: user.email}, process.env.SECRET, {
    expiresIn: 60 * 60 * 24 * 7
  });

  return user.save();
};

//
userSchema.methods.comparePassword = function (candidatePassword) {
  const user = this;
  return bcrypt.compare(candidatePassword, user.password).then(function (result) {
    return result;
  });
};

const User = model('User', userSchema);

export default User;