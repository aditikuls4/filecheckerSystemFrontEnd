import { Component, OnInit } from '@angular/core';
import { StudentService } from 'src/app/service/student.service';

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
  constructor(private studentService:StudentService) { }

  ngOnInit(): void {
  }
  myformsubmit()
  {
   if(this.Student.username== null || this.Student.studentEmail==null || this.Student.firstname==null || 
     this.Student.password==null || this.Student.phone==null )
     {
       alert("please fill the form correctly");
       return ;
     }

      this.studentService.addUser(this.Student).subscribe(
        (data)=>{

          console.log(data);
          alert("success")
          
        },
        (error)=>{
          console.log(error);
          alert("error")
          
        }


      )

  }
}
