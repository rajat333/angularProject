import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { AuthInterceptor, HTTPStatus } from '../../interceptor/auth.interceptor';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';


@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.css']
})
export class PopUpComponent implements OnInit {

  public responseMessage: string = '';
  public enablePopup: boolean = false;
  public isSession: boolean;
  subscription: Subscription;
  constructor(private _httpStatus: AuthInterceptor, 
              private router: Router,
              private httpStatus: HTTPStatus
            ) {

    // this._httpStatus.getStatus$.subscribe((data) => {
    //   console.log('<3333333333333in Subscriber>>>>>>>',data);
    // })
  }
  ngOnInit() {
    console.log('>>>>>>setpop ngonit >>>>>>');
    this.getSubscribeData();  
  }
  getSubscribeData(): Observable<any> {
    const popUpValue: any = {};
    // this.httpStatus.getHttpStatus().subscribe((status: boolean) => { 
    //   console.log('>>>>INPOP HTTP ACTIVITY>>>>>>>>>>',status);
    // });

    this.httpStatus.getHttpStatus1().subscribe( (data: any ) =>{ 
     
       console.log('POP SUBSCRIBER STATUS 1',data);
      if (Object.keys(data).length > 0) {

        popUpValue.enablePopup = this.enablePopup = data.status;
        popUpValue.responseMessage = this.responseMessage = data.errorMsg;
        popUpValue.isSession = this.isSession = data.isLogoutSession;
        console.log('>>>>>>>>>.infifififi >get subscribe data>>>>>>');
      }
    });
    console.log('>>>>>>>>>popup value>>>>>>',popUpValue);
    return popUpValue;
  }
  
  closePopUp(): void {
    this.enablePopup = false;
    if (this.isSession) {
      if (!this.enablePopup) {
        localStorage.clear();
        sessionStorage.clear();
        this.router.navigate(['/login']);
      }
    }
  }
}
