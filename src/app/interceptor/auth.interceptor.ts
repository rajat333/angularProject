import { Injectable } from '@angular/core';
import {
  HttpRequest, HttpResponse,HttpHandler, HttpEvent, HttpErrorResponse,HttpInterceptor
} from '@angular/common/http';
import { AuthService } from "../services/auth.service";
import {  Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import { Buffer } from 'buffer';
import * as crypto from 'crypto-browserify';
import { Router } from '@angular/router';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';

@Injectable()
export class HTTPStatus {
  private requestInFlight$: BehaviorSubject<boolean>;
  private responsePopUp : Subject<any> ;

  constructor() {
    this.requestInFlight$ = new BehaviorSubject(false);
    this.responsePopUp =  new Subject<any>();
  }

  setHttpStatus(inFlight: boolean) {
    this.requestInFlight$.next(inFlight);
  }


  setHttpStatus1(status: boolean, errorMsg: String, logout: boolean) {
    console.log('>>>>>>>In set Http status 11111');
    this.responsePopUp.next( { status:status, errorMsg: errorMsg,isLogOut: logout });
  }

  getHttpStatus(): Observable<boolean> {
    return this.requestInFlight$.asObservable();
  }

  getHttpStatus1(): Observable<boolean> {
    console.log('>>>>>>>getHTTP STATUS 1 >>>>');
    return this.responsePopUp.asObservable();
  }
}

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(public auth: AuthService, 
              private router: Router,
              private status: HTTPStatus ) {}

  intercept(request: HttpRequest < any > , next: HttpHandler): Observable < HttpEvent < any >> {

    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.auth.getToken()}`
      }
    });

    // return next.handle(request);
    //for server response 
    return next.handle(request).do((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        // do stuff with response if you want
        
        console.log('>>>>>>>>>Network Success>>>>>');
        // this.status.setHttpStatus1(true, 'Error Occured, Network Error.Please try again later.', false);
   
      }
    }, (err: any) => { 
      if (err instanceof HttpErrorResponse) {

        if (err.status === 401) {
          console.log('401 ERROR');
        } else if (err.status === 0) {
          console.log('>>>>>>in else if>>>>');
          if(!navigator.onLine){
            console.log('Offline Mode');
              // this.status.setHttpStatus(false);
              this.status.setHttpStatus1(true, 'Error Occured, Network Error.Please try again later.', false);
            }else{
            // console.log('>>>>>>>>>..wirhout navigator');
          }
        }

      }
    });
   
  }
}
