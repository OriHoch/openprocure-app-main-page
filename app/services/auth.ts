import fetch from 'node-fetch';
import { Response } from 'node-fetch';
import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import * as Promise from 'bluebird';

@Injectable()
export class AuthService {
  private getToken(): any {
    let jwt = localStorage.getItem("jwt");
    return jwt ? jwt : '';
  }

  check(next: any): PromiseLike<any> {
    return new Promise((resolve, reject) => {
      fetch('https://localhost:8001/auth/check?jwt=' + this.getToken() + '&next=' + encodeURIComponent(next))
        .then((response: Response) => response.json())
        .then((response: any) => {
          resolve(response);
        });
    });
  }

}
