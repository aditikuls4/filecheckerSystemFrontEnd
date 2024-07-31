import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
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
    email:'',
    firstName:'',
    lastName:'',
    password:'',
    phoneNo:'',
    rollId:''

  }
;
hide = true;
  constructor(private studentService:StudentService,private _snackBar: MatSnackBar,private router :Router) { }

  ngOnInit(): void {
  }
  
  myformsubmit()
  {
    if (!this.Student.username.trim() || !this.Student.email.trim() || !this.Student.firstName.trim() || 
    !this.Student.password.trim() || !this.Student.phoneNo.toString().trim() || !this.Student.rollId.toString().trim()) {
  this._snackBar.open('All fields must be filled', '', {
    duration: 3000,
    verticalPosition: 'top'
  });
  return;


     }

     if (!this.isValidEmailFormat(this.Student.email)) {
      this._snackBar.open('Invalid email format', '', {
        duration: 3000,
        verticalPosition: 'top'
      });
      return;
    }

    if( this.Student.phoneNo.toString().trim().length !== 10)
      {
        this._snackBar.open('phone number should be of 10 digits', '', {
          duration: 3000,
          verticalPosition: 'top'
        });
        return;
      }

      this.studentService.addUser(this.Student).subscribe(
        (data:any)=>{

          console.log(data);
          // this._snackBar.open('success','',{
          //   duration:3000,
          //   verticalPosition:'top'
          // });


          Swal.fire({
            title: "Registration successfullY",
            text: "user id "+data.username,
            icon: "success",
            confirmButtonText: "OK"
          }).then((result) => {
            if (result.isConfirmed) {
              this.router.navigate(['/login'])
            }
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
  isValidEmailFormat(email: string): boolean {
    // Regular expression to validate email format
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }

}
