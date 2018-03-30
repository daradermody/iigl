import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Converter} from 'showdown';

@Injectable()
export class DocumentService {
  constructor(private http: HttpClient) {
    this.markdownConverter = new Converter({
      headerLevelStart: 2
    });
  }

  private markdownConverter;

  getDoc(link: string): Observable<string> {
    return this.http.get(link, {responseType: 'text'})
      .map((markdown) => this.markdownConverter.makeHtml(markdown));
  }
}
