import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class TournamentService {

  constructor(private http: HttpClient) {}

  getTournamenets(): Observable<Object> {
    return this.http.get('https://dtmwra1jsgyb0.cloudfront.net/organizations/5a1da7231bd85203476e7f7c/tournaments');
  }

  getJoinCode(tournamentId: string) {
    return this.http.get('/api/getJoinCode/' + tournamentId);
  }
}
