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
    
    this.httpStatus.getHttpStatus1().subscribe( (data: any ) =>{ 
      console.log('FETCH SUBSCRIBER ',data)
    
    });
    console.log('>>..in constructor>>>>>>>>');
  }

  
}
