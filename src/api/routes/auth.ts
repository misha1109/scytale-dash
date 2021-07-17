import * as express from 'express';
import {loginController, logoutController, setUser} from '../controllers/auth';
import {sendHttp} from '../utilities/http';

export const authorizationRoute = express.Router().use([
  express.Router().post('/login', [
    setUser,
    sendHttp(loginController)
  ]),
  express.Router().get('/logout', [
    sendHttp(logoutController),
  ]),
]);
