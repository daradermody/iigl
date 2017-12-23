import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class AuthService {

  constructor() {
  }

  login(email: string, password: string): Observable<string> {
    return Observable.create((observer) => {
      observer.error('what a nice observation!');
    });

    // return this.http.post<User>('/api/login', {email, password}).shareReplay();
  }
}
