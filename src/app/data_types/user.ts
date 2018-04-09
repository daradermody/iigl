export class User {
  email: string;
  battlefy: string;
  password: string;
  games: string[];
  emailVerified: boolean;

  constructor(email: string, battlefy: string, password: string, games: string[], emailVerified = false) {
    this.email = email.toLowerCase();
    this.battlefy = battlefy;
    this.password = password;
    this.games = games;
    this.emailVerified = emailVerified;
  }
}
