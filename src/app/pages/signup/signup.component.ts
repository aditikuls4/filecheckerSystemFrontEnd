import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public Student={
    username:'',
    studentEmail:'',
    firstname:'',
    lasttname:'',
    password:'',
    phone:''

  }
;
hide = true;
  constructor() { }

  ngOnInit(): void {
  }
  myformsubmit()
  {
    alert('form submit');
  }
}
