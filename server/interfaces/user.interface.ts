import { Request } from 'express';

export interface IUser {
  _id: string;
  email: string;
  name: string;
  password?: string;
}

export interface TypedRequestUser<T> extends Request {
  user?: T;
}
