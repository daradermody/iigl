'use strict';

const fs = require('fs');

const data_files_path = 'server/database/data_files';
const teams_file = data_files_path + '/teams.json';


exports.addTeam = function (team) {
  const teams = exports.getTeams();
  if (getTeamFromTeams(team.name, teams)) {
    throw "Team already exists";
  }

  teams.push(team);
  fs.writeFileSync(teams_file, JSON.stringify(teams, null, 2), 'utf-8');
};

exports.getTeams = function () {
  return JSON.parse(fs.readFileSync(teams_file, 'utf-8'));
};

exports.getTeam = function (name) {
  const team = getTeamFromTeams(name, exports.getTeams())
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
