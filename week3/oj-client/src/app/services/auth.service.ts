// src/app/auth/auth.service.ts

import { Injectable } from '@angular/core';
import { tokenNotExpired } from "angular2-jwt";
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';

declare var Auth0Lock: any;

@Injectable()
export class AuthService {

  clientID = 'Uyp-st8V60Usca4HX6WPZJS55zPzEdFU';
  domain = 'yyming009.auth0.com';
  lock = new Auth0Lock(this.clientID, this.domain, {});

  constructor(private http: Http) {
    // this.lock.on("authenticated", (authResult) => {
    //   localStorage.setItem('id_token', authResult.idToken);
    // });
  }

  public login(): Promise<Object> {
    return new Promise((resolve, reject) => {
      this.lock.show((error: string, profile: Object, id_token: string) => {
        if (error) {
          reject(error);
        } else {
          localStorage.setItem('profile', JSON.stringify(profile));
          localStorage.setItem('id_token', id_token);
          resolve(profile);
        }
      });
    });

  }

  public authenticated() {
    return tokenNotExpired();
  }

  public logout() {
    localStorage.removeItem('id_token');
    localStorage.removeItem('profile');
  }

  public getProfile() {
    return JSON.parse(localStorage.getItem('profile'));
  }


  public resetPassword(): void {
    let profile = this.getProfile();
    let url: string = 'https://${this.domain}/dbconnections/change_password';
    let headers = new Headers({ 'content-type': 'application/json' });
    let body = {
      client_id: this.clientID,
      email: profile.email,
      connection: 'Username-Password-Authentication'
    }

    this.http.post(url, body, headers)
      .toPromise()
      .then( (res: Response) => {
        console.log(res.json());
      })
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.log('Error occured', error);
    return Promise.reject(error.message || error);
  }

}
