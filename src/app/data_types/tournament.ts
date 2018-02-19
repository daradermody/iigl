import * as moment from 'moment';
import {Game} from './game';

export class Tournament {
  _id: string;
  name: string;
  game: Game;
  type: string;
  start: moment.Moment;
  teamsCount: number;
  url: URL;
  joinCode: string;

  constructor(id: string, name: string, game: Game, type: string, start: moment.Moment, teamsCount: number, url: URL) {
    this._id = id;
    this.name = name;
    this.game = game;
    this.type = type;
    this.start = start;
    this.teamsCount = teamsCount;
    this.url = url;
  }

  static fromBattlefyResponse(data): Array<Tournament> {
    return data.map(t => new Tournament(
      t._id,
      t.name,
      new Game(t.game.name, t.game.iconUrl),
      t.type,
      moment(t.startTime),
      t.teamsCount,
      new URL(`https://battlefy.com/iigl/tournament/${t._id}/info`)
    ));
  }
}
