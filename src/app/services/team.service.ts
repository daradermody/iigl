import {Injectable} from '@angular/core';
import {Team} from '../data_types/team';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { GameScore } from '../data_types/game-score';

@Injectable()
export class TeamService {

  constructor(private http: HttpClient) {}

  getTeams(): Observable<Array<Team>> {
    return this.http.get<Array<Team>>('/api/teams');
  }

  getGameScore(name: string, game: string): Observable<number> {
    return this.http.get<number>('/api/team/' + name + '/score/' + game);
  }

  getGameScores(): Observable<Array<GameScore>> {
    return this.http.get<Array<GameScore>>('/api/teams/scores/');
  }

  updateTeam(name: string, team: Partial<Team>): Observable<void> {
    console.log('Updating Team: ' + name);
    return this.http.put<void>('/api/team/' + name, team);
  }
}
