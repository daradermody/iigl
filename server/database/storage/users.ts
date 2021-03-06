import * as fs from 'fs';
import {User} from '../../../src/app/data_types/user';

export class Users {
  private static usersFile = Users.getUsersFile();

  static addUser(user: User) {
    const users = Users.getUsers();
    if (Users.getUserFromUsers(user.email, users)) {
      throw new Error('User already exists');
    }

    users.push(user);
    fs.writeFileSync(Users.usersFile, JSON.stringify(users, null, 2), 'utf-8');
  }

  private static getUsersFile(): string {
    const usersFile = 'server/database/data_files/users.json';
    if (!fs.existsSync(usersFile)) {
      fs.writeFileSync(usersFile, JSON.stringify([]));
    }
    return usersFile;
  }

  static getUsers(): Array<User> {
    return JSON.parse(<string>fs.readFileSync(Users.usersFile, 'utf-8'));
  }

  static userExists(email: string): boolean {
    return Users.getUser(email) != null;
  }

  private static getUserFromUsers(email: string, users: Array<User>): User {
    for (const user of users) {
      if ('email' in user && user.email === email) {
        return user;
      }
    }
  }

  static getUser(email): User {
    return Users.getUserFromUsers(email, Users.getUsers());
  }

  static updateUser(updatedUser: User) {
    const users = Users.getUsers();
    Users.getUsers().find((user, index) => {
      if (user.email === updatedUser.email) {
        users[index] = updatedUser;
      }
      return user.email === updatedUser.email;
    });
    fs.writeFileSync(Users.usersFile, JSON.stringify(users, null, 2), 'utf-8');
  }
}
