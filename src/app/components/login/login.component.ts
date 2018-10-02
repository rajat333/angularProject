import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl , Validators} from '@angular/forms';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private login: FormBuilder, private route: Router) { }

  ngOnInit() {
    console.log('>>>>>.NGONIT>>>>>>>>>');
    this.loginForm = this.login.group({
      
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });

    this.loginForm.valueChanges.subscribe( element=>{ 
      console.log('>>>>>>>>Value>Changes>>>>>>>',element); 
    });

  }


 onSubmit(){
   console.log('>>>ON>>>Submit>>>>>>>');
  console.warn(this.loginForm.value);
  this.route.navigate(['/register']);
  
 }

}
