import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StudentService } from 'src/app/service/student.service';
import Swal from 'sweetalert2/dist/sweetalert2.js'

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
  constructor(private studentService:StudentService,private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }
  myformsubmit()
  {
   if(this.Student.username== null || this.Student.studentEmail==null || this.Student.firstname==null || 
     this.Student.password==null || this.Student.phone==null )
     {
      this._snackBar.open('All fields must be filled','',{
        duration:3000,
        verticalPosition:'top'
      });
      
       return ;
     }

      this.studentService.addUser(this.Student).subscribe(
        (data:any)=>{

          console.log(data);
          // this._snackBar.open('success','',{
          //   duration:3000,
          //   verticalPosition:'top'
          // });
          Swal.fire({
            title: "Registration successfully!",
            text: "user id "+data.username,
            icon: "success"
          });
          
        },
        (error)=>{
          console.log(error);
          this._snackBar.open('error','',{
            duration:3000,
            verticalPosition:'top'
          });
          
        }


      )

  }
}
