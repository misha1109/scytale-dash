import * as express from 'express';
import {getAdminsController, getUsersController, setAllUsersMfaState} from '../controllers/users';
import {requireAdmin} from '../controllers/auth';
import {sendHttp} from '../utilities/http';

export const usersRoute = express.Router().use('/users', [
  express.Router().get('/', sendHttp(getUsersController)),
  requireAdmin,
  express.Router().get('/admins', sendHttp(getAdminsController)),
  express.Router().post('/mfa', sendHttp(setAllUsersMfaState)),
]);
