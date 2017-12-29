import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from "@angular/common/http";
import {HttpResponse} from "@angular/common/http/src/response";
import * as moment from "moment";
import 'rxjs/add/operator/do';
import "rxjs/add/operator/shareReplay";
import {User} from "./user";
import * as jwt from 'jsonwebtoken';


@Injectable()
export class AuthService {

  constructor(private http: HttpClient) {
  }
/**/
  login(email: string, password: string): Observable<HttpResponse<Object>> {
    return this.http.post<HttpResponse<Object>>('/api/login', {
      email: email,
      password: password
    })
      .do(this.setSession)
      .shareReplay();
  }

  private setSession(authResult) {
    const expiresAt = moment().add(authResult.expiresIn,'second');

    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()) );
    console.log('localStorage set');
  }

  logout() {
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
  }

  public isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  getExpiration() {
    const expiresAt = JSON.parse(localStorage.getItem("expires_at"));
    return moment(expiresAt);
  }

  register(user: User): Observable<HttpResponse<Object>>  {
    return this.http.post<HttpResponse<Object>>('/api/user', user)
  }

  getEmail(): string {
    const token = localStorage.getItem("id_token")
    if (token) {
      return jwt.decode(token).sub;
    }
  }
}
