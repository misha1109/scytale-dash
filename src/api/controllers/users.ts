import {filterUserContentByRole, getUsers, setUsers} from '../services/users';
import {ROLES} from '../../config/auth';

export const getUsersController = (req) => {
  const users = getUsers([ROLES.USER, ROLES.ADMIN]);
  const {role} = req.user;
  const filteredContentUsers = users.map(user => filterUserContentByRole(user, role));
  return filteredContentUsers;
};

export const getAdminsController = () => {
  const admins = getUsers([ROLES.ADMIN]);
  return admins;
};

export const setAllUsersMfaState = (req, res) => {
  const {user} = req;
  const isAdmin = user.role === ROLES.ADMIN;
  if (isAdmin) {
    const {setMfa} = req.body;
    const users = getUsersController(req);
    const newUsers = {};
    users.forEach(currentUser => {
      newUsers[currentUser.id] = {
        ...currentUser,
        two_factor_enabled: setMfa
      };
    });
    setUsers(newUsers);
    return true;
  } else {
    throw({message: `Admin required`, status: 403});
  }
};
