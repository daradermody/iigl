export class User {
  email: string;
  battlefy: string;
  password: string;
  games: string[];

  constructor(email: string, battlefy: string, password: string, games: string[]) {
    this.email = email;
    this.battlefy = battlefy;
    this.password = password;
    this.games = games;
  }

  isValid(): boolean {
    return !!(this.email && this.battlefy && this.password);
  }
}
