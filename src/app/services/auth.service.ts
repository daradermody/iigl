import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import {HttpResponse} from '@angular/common/http/src/response';
import * as moment from 'moment';


import {User} from '../data_types/user';
import {Team} from '../data_types/team';

import {DecodedJwt} from '../data_types/decoded-jwt';
import {shareReplay, tap} from 'rxjs/operators';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable()
export class AuthService {

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {
  }

  static isLoggedIn() {
    return moment().isBefore(AuthService.getExpiration());
  }

  isAdmin() {
    const decodedToken = <DecodedJwt>this.jwtHelper.decodeToken(localStorage.getItem('id_token'));
    return decodedToken.isAdmin;
  }

  static logout() {
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
  }

  private static getExpiration() {
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return moment(expiresAt);
  }

  private static setSession(authResult) {
    const expiresAt = moment().add(authResult.expiresIn, 'seconds');

    localStorage.setItem('id_token', authResult['idToken']);
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
  }

  registerUser(user: User): Observable<HttpResponse<Object>> {
    return this.http.post<HttpResponse<Object>>('/api/user', user);
  }

/*   registerTeam(team: Team): Observable<HttpResponse<Object>> {
    return this.http.post<HttpResponse<Object>>('/api/team', team);
  } */

  confirmAccountCreationToken(token) {
    return this.http.get('/api/confirmRegistration', {
      params: new HttpParams().set('token', token)
    });
  }

  login(email: string, password: string): Observable<HttpResponse<Object>> {
    return this.http.post<HttpResponse<Object>>('/api/login', {
      email: email,
      password: password
    })
      .pipe(
        tap(AuthService.setSession),
        shareReplay(1)
      );
  }

  getBattlefyAccountInfo(username: string): Observable<Object> {
    return this.http.get('https://api.battlefy.com/profile/' + encodeURIComponent(username.toLowerCase()));
  }
}
