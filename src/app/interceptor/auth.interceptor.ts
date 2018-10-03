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
import {
  AuthService
} from '../services/auth.service';
import {
  Observable
} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';

import 'rxjs/add/operator/do';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(public auth: AuthService) {}

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
        if (err.status === 401) {
          // redirect to the login route
          // or show a modal
        }
      }
    });
   
  }
}
