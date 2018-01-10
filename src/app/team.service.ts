import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class TeamService {

  constructor(private http: HttpClient) { }

  createNewTeam(team) {
    return this.http.post('/api/teams', team);
  }

  getTeams() {
    return this.http.get('/api/teams');
  }

  joinTeam(teamName: string) {
    return this.http.get('/api/join/' + teamName)
  }

  leaveTeam(teamName: string) {
    return this.http.get('/api/leave/' + teamName)
  }
}
