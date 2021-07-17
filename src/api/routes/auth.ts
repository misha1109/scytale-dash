import * as express from 'express';
import {logoutController, setUser} from '../controllers/auth';
import {sendHttp} from '../utilities/http';

export const authorizationRoute = express.Router().use([
  express.Router().post('/login', [
    setUser,
    (req, res, next) => {
      res.send({data: req.user});
    }
  ]),
  express.Router().get('/logout', [
    sendHttp(logoutController),
  ]),
]);
