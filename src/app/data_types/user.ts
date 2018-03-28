export class User {
  email: string;
  battlefy: string;
  password: string;
  games: string[];

  constructor(email: string, battlefy: string, password: string, games: string[]) {
    this.email = email.toLowerCase();
    this.battlefy = battlefy;
    this.password = password;
    this.games = games;
  }
}
