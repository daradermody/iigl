export class User {
  email: string;
  battlefy: string;
  password: string;
  games: string[];
  emailVerified: boolean;
  isAdmin: boolean;

  constructor(email: string, battlefy: string, password: string, games: string[]) {
    this.email = email.toLowerCase();
    this.battlefy = battlefy;
    this.password = password;
    this.games = games;
    this.emailVerified = false;
    this.isAdmin = false;
  }
}
