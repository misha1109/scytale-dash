import {ROLES} from '../../config/auth';
import {get, post} from './db';

export const getUsers = (roles: string[]): any[] => {
  const users = get('users');
  return Object.values(users)
    .filter((user: any) => {
      return roles.includes(user.role);
    });
};

export const setUsers = (users => {
  post( 'users', users);
});

export const getUser = (userId: string) => {
  const users = get('users');
  return users[userId];
};

export const filterUserContentByRole = (user, role) => {
  if (role !== ROLES.ADMIN) {
    return {
      id: user.id,
      username: user.username,
      name: user.name
    };
  } else {
    return user;
  }
};
