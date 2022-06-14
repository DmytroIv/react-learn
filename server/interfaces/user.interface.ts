import { Request } from 'express';
import { ObjectId } from 'mongoose';

export interface IUser {
  _id: ObjectId;
  email: string;
  name: string;
  password?: string;
}

export interface TypedRequestUser<T> extends Request {
  user?: T;
}
