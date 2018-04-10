import {Injectable} from '@angular/core';
import {User} from '../data_types/user';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class UserService {

  constructor(private http: HttpClient) {}

  getUsers(): Observable<Array<User>> {
    return this.http.get<Array<User>>('/api/users');
  }

  updateUser(email: string, user: Partial<User>): Observable<void> {
    console.log('Updating user: ' + email);
    return this.http.put<void>('/api/user/' + email, user);
  }
}
