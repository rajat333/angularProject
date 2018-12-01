import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { AuthInterceptor } from '../../interceptor/auth.interceptor';
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
  constructor(private _httpStatus: AuthInterceptor, private router: Router) {
  }
  ngOnInit() {
    this.getSubscribeData();
  }
  getSubscribeData(): Observable<any> {
    const popUpValue: any = {};
    this._httpStatus.getStatus$.subscribe((data) => {
      if (Object.keys(data).length > 0) {

        popUpValue.enablePopup = this.enablePopup = data.status;
        popUpValue.responseMessage = this.responseMessage = data.errorMsg;
        popUpValue.isSession = this.isSession = data.isLogoutSession;
        console.log('>>>>>>>>>.infifififi >get subscribe data>>>>>>');
      }
    });
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
