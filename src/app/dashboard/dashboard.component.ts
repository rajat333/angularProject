import { Component, OnInit } from '@angular/core';

import { FormArray , FormBuilder , Validators} from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  profileForm: any;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {

      this.profileForm = this.fb.group({
        firstName: ['', Validators.required],
        lastName: [''],
        address: this.fb.group({
          street: [''],
          city: [''],
          state: [''],
          zip: ['']
        }),
        aliases: this.fb.array([
          this.fb.control('')
        ])
      });
  }

  get aliases() {
    console.log('>>>In getting form Array');
    return this.profileForm.get('aliases') as FormArray;
  }

  addAlias() {
    console.log('>>>Adding Alias>>>>');
    this.aliases.push(this.fb.control(''));
  }

}
