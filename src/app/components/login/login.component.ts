import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl , Validators} from '@angular/forms';
import {  Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private login: FormBuilder,private service: AuthService, private route: Router) { }

  ngOnInit() {
    console.log('>>>>>.NGONIT>>>>>>>>>');
    this.loginForm = this.login.group({
      
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });

    this.loginForm.valueChanges.subscribe( element=>{ 
      // console.log('>>>>>>>>Value>Changes>>>>>>>',element); 
    });

  }


 onSubmit(){
   console.log('>>>ON>>>Submit>>>>>>>');
  console.warn(this.loginForm.value);
  this.service.loginAPI(this.loginForm.value).subscribe( 
    (data) =>{
    console.log('Login Success ',data);
    this.route.navigate(['/dashboard']);
  },
  (err)=>{
      console.log('>>>>>>login error subscribe');
  },
  ()=>{ console.log('> Observer Complete>>>>');
   });   
  
  
 }

}
