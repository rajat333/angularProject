import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {  Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {


  constructor(
    private httpClient: HttpClient,
    private route: Router
  ){

  }

  public getToken(): string {
    return localStorage.getItem('token');
  }

  public isAuthenticated(): string {
    // get the token
    const token = this.getToken();
    // return a boolean reflecting 
    // whether or not the token is expired
    // return tokenNotExpired(token);
    return token;
  }

  public loginAPI(obj): Observable<any>{

  return this.httpClient.get('https://jsonplaceholder.typicode.com/todos/1');
  }

}