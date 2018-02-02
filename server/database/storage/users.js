'use strict';

const fs = require('fs');
const bcrypt = require('bcrypt');


const USERS_FILE = 'server/database/data_files/users.json';

exports.addUser = function(user) {
  const users = exports.getUsers();
  if (getUserFromUsers(user.email, users)) {
    throw new Error('User already exists');
  }

  users.push(user);
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2), 'utf-8');
};

exports.getUsers = function() {
  return JSON.parse(fs.readFileSync(USERS_FILE, 'utf-8'));
};

exports.getUser = function(email) {
  const user = getUserFromUsers(email, exports.getUsers());
  if (!user) {
    throw new Error('User does not exist');
  }
  return user;
};

exports.userExists = function(email) {
  return getUserFromUsers(email, exports.getUsers()) != null;
};

exports.verifyEmailAndPassword = function(email, password) {
  const user = getUserFromUsers(email, exports.getUsers());
  return user != null && bcrypt.compareSync(password, user.password);
};


function getUserFromUsers(email, users) {
  for (const user of users) {
    if ('email' in user && user.email === email) {
      return user;
    }
  }
}
