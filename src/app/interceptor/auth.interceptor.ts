import {
  Injectable
} from '@angular/core';
import {
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
  HttpInterceptor
} from '@angular/common/http';
import { AuthService } from "../services/auth.service";
import {
  Observable
} from 'rxjs/Observable';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';

import { Buffer } from 'buffer';
import * as crypto from 'crypto-browserify';
import { Router } from '@angular/router';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  private requestPopup: Subject<any> = new Subject<any>();

  constructor(public auth: AuthService, private router: Router, private status: AuthInterceptor,) {}

  getStatus$ =  this.requestPopup.asObservable();
  setStatus(isPopup, error, logout) {
    this.requestPopup.next({ status: isPopup, errorMsg: error, isLogoutSession: logout });
  }

  intercept(request: HttpRequest < any > , next: HttpHandler): Observable < HttpEvent < any >> {

    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.auth.getToken()}`
      }
    });

    // return next.handle(request);
    return next.handle(request).do((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        // do stuff with response if you want
      }
    }, (err: any) => {
      if (err instanceof HttpErrorResponse) {

        console.log('>window navigator',navigator.onLine);
        if (err.status === 401) {
       
        } else if (err.status === 0) {
          
          this.status.setStatus(true, 'Error Occured, Please try again after sometime.', false);
        }

      }
    });
   
  }
}
