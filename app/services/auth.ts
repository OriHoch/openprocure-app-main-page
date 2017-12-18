import fetch from 'node-fetch';
import { Response } from 'node-fetch';
import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import * as Promise from 'bluebird';
import {URLSearchParams} from "@angular/http";

@Injectable()
export class AuthService {
  private static getToken(): any {
    return localStorage.getItem("jwt");
  }

  private static setToken(jwt: string): void {
    localStorage.setItem('jwt', jwt);
  }

  check(next: any): PromiseLike<any> {
    return new Promise((resolve, reject) => {
      let jwt = AuthService.getToken();
      if (!jwt) {
        let params = new URLSearchParams(location.search);
        jwt = params.get('jwt');
        if (jwt) {
          AuthService.setToken(jwt);
        }
      }
      fetch('https://localhost:8001/auth/check?jwt=' + (jwt ? jwt : '') + '&next=' + encodeURIComponent(next))
        .then((response: Response) => response.json())
        .then((response: any) => {
          resolve(response);
        });
    });
  }

}
