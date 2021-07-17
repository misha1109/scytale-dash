import * as express from 'express';
import {setUser} from '../controllers/auth';
import {authorizationRoute} from './auth';
import {errorHandler} from './error';
import {usersRoute} from './users';
import {projectsRoute} from './projects';

export default express.Router().use('/api', [
  authorizationRoute,
  setUser,
  usersRoute,
  projectsRoute,
  errorHandler
]);
