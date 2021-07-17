import {getUser} from '../services/users';
import {MFA_REQUIRED, ROLES} from '../../config/auth';

export const setUser = (req, res, next) => {
  const userId = getUserId(req);
  if (userId) {
    const user = getUser(userId);
    if (user) {
      const isAuthenticated = authenticateUser(req, user);
      if (isAuthenticated) {
        initializeSession(req, res, user);
      } else {
        throw({message: MFA_REQUIRED, status: 401});
      }
    } else {
      throw({message: `User ${userId} not found`, status: 404});
    }
  } else {
    throw({message: 'No user id', status: 400});
  }
  next();
};

const initializeSession = (req, res, user) => {
  req.user = user;
  res.cookie('auth', user.id);
  // res.cookie('forceMfa', false);
};

const getUserId = (req): string => { // getting the user id from body or headers
  const {body, headers, cookies} = req;
  const userId = body.userId || headers.auth || cookies.auth;
  return userId;
};

const authenticateUser = (req, user): boolean => {
  const {two_factor_enabled} = user;
  const {body, headers, cookies} = req;
  const session = cookies.auth;
  if (two_factor_enabled && !session) {
    const mfa = body.mfa || headers.mfa;
    return !!mfa;
  }
  return true;
};

export const requireAdmin = (req, res, next) => {
  const {role} = req.user;
  if (role !== ROLES.ADMIN) {
    throw({message: 'Admin role is required', status: 403});
  }
  next();
};

export const logoutController = (req, res, next) => {
  res.clearCookie('auth');
  return true;
};

