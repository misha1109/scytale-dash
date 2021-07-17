import {get} from '../services/db';

export const getProjectsController = (req) => {
  const projects = get('projects');
  const projectsList = filterProjectsContent(projects);
  return projectsList;
};

const filterProjectsContent = (projects) => {
  return Object.entries(projects)
    .map(([projectName, projectContent]) => {
      return {
        name: projectName,
        // @ts-ignore
        id: projectContent.id
      };
    });
};

export const getProjectController = (req) => {
  const {id} = req.params;
  const projects = get('projects');
  const project = findProjectById(projects, id);
  if (project) {
    return project;
  } else {
    throw({
      message: `Project ${id} not found`,
      status: 404
    });
  }
};

const findProjectById = (projects, id) => {
  const project = Object.values(projects)
    .find((projContent) => {
      // @ts-ignore
      // tslint:disable-next-line:triple-equals
      return projContent.id == id;
    });
  return project as any;
};

export const getProjectTreeController = (req) => {
  const project = getProjectController(req);
  return project.tree;
};

export const getProjectsApprovalsController = (req) => {
  const project = getProjectController(req);
  return project.approvals;
};
