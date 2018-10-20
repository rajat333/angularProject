import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, FormArray } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  myForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.myForm = this.fb.group({
      email: '',
      phones: this.fb.array([ ])
    })
  
  }
  
  get phoneForms() {
    return this.myForm.get('phones') as FormArray
  }
  
  addPhone() {
  
    const phone = this.fb.group({ 
      area: [],
      prefix: [],
      line: [],
    })
    console.log('>>>>phone>>>>>',phone);
    this.phoneForms.push(phone);
  }
  
  deletePhone(i) {
    console.log('>>>>index>>>>>',i);
    this.phoneForms.removeAt(i)
  }


}
