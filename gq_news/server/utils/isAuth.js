import jwt from 'jsonwebtoken';
import {AuthenticationError} from 'apollo-server-express';
import dotenv from 'dotenv';
//
dotenv.config();

//
const throwAuthError = () => {
  throw new AuthenticationError('U are not auth !');
};

const authorize = (req, verify = false) => {
  const authorizationHeader = req.headers.authorization || '';
  if (!authorizationHeader) {
    req.isAuth = false;
    return !verify ? throwAuthError() : req;
  }

  const token = authorizationHeader.replace('Bearer ', '');
  if (!token) {
    req.isAuth = false;
    return !verify ? throwAuthError() : req;
  }

  let decodedJwt;

  try {

    decodedJwt = jwt.verify(token, process.env.SECRET);
    if (!decodedJwt) {
      req.isAuth = false;
      return !verify ? throwAuthError() : req;
    }

    req.isAuth = true;
    req._id = decodedJwt._id;
    req.email = decodedJwt.email;
    req.token = token;
    return req;
  } catch (err) {
    req.isAuth = false;
    return !verify ? throwAuthError() : req;
  }
};

export default authorize;


