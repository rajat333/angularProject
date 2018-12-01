import { Component } from '@angular/core';
import { AuthInterceptor , HTTPStatus } from './interceptor/auth.interceptor';
import { AuthService } from './services/auth.service';
import { PopUpComponent } from './shared/pop-up/pop-up.component';
// import { AuthInterceptor } from './interceptor/auth.interceptor';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'reactive-form';
 
  constructor(private authService: AuthService ,
              private _httpStatus :AuthInterceptor,
              private httpStatus: HTTPStatus,
            ){
    
    this._httpStatus.requestPopup.asObservable().subscribe((data) => {
      console.log('<11111111>in Subscriber>>>>>>>',data);
    })
    this.httpStatus.getHttpStatus().subscribe((status: boolean) => { console.log('>>>>>>>>>>>>>>',status)});
    console.log('>>..in constructor>>>>>>>>');
  }

  
}
