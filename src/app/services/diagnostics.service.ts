import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class DiagnosticsService {

  constructor(private http: HttpClient) { }

  getLogs(): Observable<{info: string, error: string}> {
    return this.http.get<{info: string, error: string}>('/api/logs');
  }
}
