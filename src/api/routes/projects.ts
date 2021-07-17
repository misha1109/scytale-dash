import * as express from 'express';
import {sendHttp} from '../utilities/http';
import {getProjectsApprovalsController, getProjectsController, getProjectTreeController} from '../controllers/projects';

export const projectsRoute = express.Router().use('/projects', [
  express.Router().get('/', sendHttp(getProjectsController)),
  express.Router().use('/:id', [
    express.Router({mergeParams: true}).use('/repository', [
      express.Router({mergeParams: true}).get('/tree', sendHttp(getProjectTreeController)),
    ]),
    express.Router({mergeParams: true}).get('/approvals', sendHttp(getProjectsApprovalsController)),
  ]),
]);
