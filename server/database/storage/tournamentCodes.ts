import * as fs from 'fs';
import {Tournament} from '../../../src/app/data_types/tournament';

export class TournamentCodes {
  private static tournamentFile = __dirname + '/../data_files/tournamentCodes.json';

  static getCode(tournamentId: string, email: string): string {
    return TournamentCodes.getCodeFromTournamentCodes(this.getTournamentCodes(), tournamentId, email);
  }

  static cacheCode(tournamentId: string, email: string, code: string) {
    const tournamentCodes = this.getTournamentCodes();

    if (TournamentCodes.getCodeFromTournamentCodes(tournamentCodes, tournamentId, email)) {
      return;
    }

    if (!(tournamentId in tournamentCodes)) {
      tournamentCodes[tournamentId] = {};
    }
    tournamentCodes[tournamentId][email] = code;
    fs.writeFileSync(TournamentCodes.tournamentFile, JSON.stringify(tournamentCodes, null, 2), 'utf-8');
  }

  private static getTournamentCodes(): Array<Tournament> {
    return JSON.parse(<string>fs.readFileSync(this.tournamentFile, 'utf-8'));
  }

  private static getCodeFromTournamentCodes(tournamentCodes, tournamentId: string, email: string): string | null {
    if (tournamentId in tournamentCodes && email in tournamentCodes[tournamentId]) {
      return tournamentCodes[tournamentId][email];
    } else {
      return null;
    }
  }
}
