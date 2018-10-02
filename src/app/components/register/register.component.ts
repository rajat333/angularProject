import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl , Validators} from '@angular/forms';
import {  Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  constructor(private register: FormBuilder, private route: Router) { }

  ngOnInit() {
    this.registerForm = this.register.group({

      name: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      mobile: new FormControl('', Validators.required),
      gender: new FormControl('', [ Validators.required, Validators.minLength(3), Validators.maxLength(8)]),
      address: this.register.group({
        street: [''],
        city: [''],
        state: [''],
        zip: ['']
      }),
      
    });

    this.registerForm.valueChanges.subscribe( element=>{ 
      console.log('>>>>>>>>Value>Changes>>>>>>>',element); 
    });
  }

  onSubmit(){

    console.log('>>Submit>>RegisterComponent>>>>>>');
    // this.registerForm.patchValue({
    //      gender:'Welcome Gender'
    // })
    this.route.navigate(['/dashboard']);
  }

  get email() {
    return this.registerForm.get('email');
 }
 get mobile() {
    return this.registerForm.get('mobile');
 }  
}
