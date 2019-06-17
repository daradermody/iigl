import { User } from './user';
import { GameScore } from './game-score';

export class Team {
  name: string;
  place: number;
  games: string[];
  isActive: boolean;
  // players: User[];
  gameScores: Array<GameScore>;

  constructor(name: string, place: number, games: string[], isActive: boolean, gameScores: GameScore[]) {
    this.name = name;
    this.place = place;
    this.games = games;
    this.isActive = isActive;
    this.gameScores = gameScores;
  }
}
