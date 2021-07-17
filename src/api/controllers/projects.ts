import {get} from '../services/db';

export const getProjectsController = (req) => {
  const projects = get('projects');
  return projects;
};

export const getProjectController = (req) => {
  const {id} = req.params;
  const projects = getProjectsController(req);
  const project = Object.entries(projects)
    .find(([projName, projContent]) => {
      // @ts-ignore
      // tslint:disable-next-line:triple-equals
      return projContent.id == id;
    });
  const projectName = project ? project[0] : false;
  if (projectName) {
    return projects[projectName];
  } else {
    throw({
      message: `Project ${id} not found`,
      status: 404
    });
  }
};
