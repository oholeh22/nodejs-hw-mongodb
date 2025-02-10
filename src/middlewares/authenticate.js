import createHttpError from 'http-errors';
import { SessionsCollection } from '../db/models/sessions.js';
import { UsersCollection } from '../db/models/users.js';

export const authenticate = async (req, res, next) => {
  const authHeader = req.get('Authorization');

  if (!authHeader) {
    console.log('Authorization header missing');
    next(createHttpError(401, 'Please provide Authorization header'));
    return;
  }

  const bearer = authHeader.split(' ')[0];
  const token = authHeader.split(' ')[1];

  if (bearer !== 'Bearer' || !token) {
    console.log('Invalid Authorization header format');
    next(createHttpError(401, 'Auth header should be of type Bearer'));
    return;
  }

  console.log('Access token:', token);

  const session = await SessionsCollection.findOne({ accessToken: token });

  if (!session) {
    console.log('Session not found for token:', token);
    next(createHttpError(401, 'Session not found'));
    return;
  }

  const isAccessTokenExpired =
    new Date() > new Date(session.accessTokenValidUntil);

  if (isAccessTokenExpired) {
    console.log('Access token expired for token:', token);
    next(createHttpError(401, 'Access token expired'));
    return;
  }

  const user = await UsersCollection.findById(session.userId);

  if (!user) {
    console.log('User not found for session:', session);
    next(createHttpError(401));
    return;
  }

  req.user = user;

  next();
};
