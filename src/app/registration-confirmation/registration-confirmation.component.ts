import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {HttpClient, HttpParams} from '@angular/common/http';

@Component({
  selector: 'app-registration-confirmation',
  templateUrl: './registration-confirmation.component.html',
  styleUrls: ['./registration-confirmation.component.css']
})
export class RegistrationConfirmationComponent implements OnInit {
  message: string;

  constructor(private activatedRoute: ActivatedRoute,
              private http: HttpClient) {}

  ngOnInit() {
    // TODO: Move to service
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.http.get('/api/registrationConfirmationUrl', {
        params: new HttpParams().set('token', params['token'])
      }).subscribe(
        () => {
          this.message = 'Registration complete! Please login';
        },
        (error) => {
          console.dir(error);
          this.message = 'Error: ' + error.message;
        }
      );

    });
  }



}
