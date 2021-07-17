import * as express from 'express';
import {sendHttp} from '../utilities/http';
import {getProjectController, getProjectsController} from '../controllers/projects';
import {errorHandler} from './error';

export const projectsRoute = express.Router().use('/projects', [
  express.Router().get('/', sendHttp(getProjectsController)),
  express.Router().get('/:id', sendHttp(getProjectController)),
]);
