'use strict';

const fs = require('fs');


const TOURNAMENT_FILE = 'server/database/data_files/tournamentCodes.json';

exports.getCode = (tournamentId, email) => {
  return getCodeFromTournamentCodes(exports.getGeneratedTournamentCodes(), tournamentId, email);
};

exports.cacheCode = (tournamentId, email, code) => {
  const tournamentCodes = exports.getGeneratedTournamentCodes();

  if (getCodeFromTournamentCodes(tournamentCodes, tournamentId, email)) {
    return;
  }

  if (!(tournamentId in tournamentCodes)) {
    tournamentCodes[tournamentId] = {};
  }
  tournamentCodes[tournamentId][email] = code;
  fs.writeFileSync(TOURNAMENT_FILE, JSON.stringify(tournamentCodes, null, 2), 'utf-8');
};

exports.getGeneratedTournamentCodes = function() {
  return JSON.parse(fs.readFileSync(TOURNAMENT_FILE, 'utf-8'));
};

function getCodeFromTournamentCodes(tournamentCodes, tournamentId, email) {
  if (tournamentId in tournamentCodes && email in tournamentCodes[tournamentId]) {
    return tournamentCodes[tournamentId][email];
  } else {
    return null;
  }
}
