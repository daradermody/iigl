'use strict';

const fs = require('fs');

const TEAMS_FILE = 'server/database/data_files/teams.json';


exports.addTeam = function (team) {
  const teams = exports.getTeams();
  if (getTeamFromTeams(team.name, teams)) {
    throw "Team already exists";
  }

  teams.push(team);
  fs.writeFileSync(TEAMS_FILE, JSON.stringify(teams, null, 2), 'utf-8');
};

exports.getTeams = function () {
  return JSON.parse(fs.readFileSync(TEAMS_FILE, 'utf-8'));
};

exports.getTeam = function (name) {
  const team = getTeamFromTeams(name, exports.getTeams());
  if (!team) {
    throw "Team does not exist";
  }
  return team;
};

function getTeamFromTeams(name, teams) {
  for (const team of teams) {
    if (team.hasOwnProperty("name") && team.name === name) {
      return team;
    }
  }
}

exports.addUserToTeam = function (email, teamName) {
  const teams = this.getTeams();
  const team = getTeamFromTeams(teamName, teams);
  if (team.members.includes(email)) {
    throw 'User "' + email + '" already joined team "' + teamName + '"!';
  } else {
    team.members.push(email);
    fs.writeFileSync(TEAMS_FILE, JSON.stringify(teams, null, 2), 'utf-8');
  }
};

exports.removeUserFromTeam = function (email, teamName) {
  const teams = this.getTeams();
  const team = getTeamFromTeams(teamName, teams);

  const i = team.members.indexOf(email);
  if(i !== -1) {
    team.members.splice(i, 1);
  }
  fs.writeFileSync(TEAMS_FILE, JSON.stringify(teams, null, 2), 'utf-8');
};
