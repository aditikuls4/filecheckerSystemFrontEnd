import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NavigationEnd, Router } from '@angular/router';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  
})
export class LoginComponent implements OnInit {
hide=true;
loginData={

  username:"",
  password:""
}
  constructor(private _snackBar: MatSnackBar,private loginService:LoginService, private router:Router) { }

  ngOnInit(): void {
  }
  formSubmit()
  {
    console.log("form submited");
    if(this.loginData.username.trim()=='' || this.loginData.username== null)
      {
        this._snackBar.open('username must be filled','',{
          duration:3000,
          verticalPosition:'top'
        });
        
      }
      if(this.loginData.password.trim()=='' || this.loginData.password== null)
        {
          this._snackBar.open('password must be filled','',{
            duration:3000,
            verticalPosition:'top'
          });
          
        }
    this.loginService.generateToken(this.loginData).subscribe(

      (data:any)=>{
        console.log("success")
        console.log(data);
this.loginService.loginUser(data.token);
this.loginService.currentUser().subscribe(
(user:any)=>{
  this.loginService.setUser(user);
  console.log(user);
  //redirect 

if(this.loginService.getUserRole()=='ADMIN')
  {
// window.location.href='/admin-dashboard';
// this.router.navigate(['/admin-dashboard']);
this.router.navigate(['/admin-dashboard']).then(() => {
  this.router.events.subscribe(event => {
    if (event instanceof NavigationEnd) {
      window.location.reload();
    }
  });
});
  }
  else if(this.loginService.getUserRole()=='STUDENT')
    {
      // window.location.href='/student-dashboard';
      // this.router.navigate(['/student-dashboard']);
      this.router.navigate(['/student-dashboard']).then(() => {
        this.router.events.subscribe(event => {
          if (event instanceof NavigationEnd) {
            window.location.reload();
          }
        });
      });
    }
    else
    {
      this.loginService.logout();
      
      
    }


}

)
        
      }
      ,
      (error:any)=>{
        console.log("error")
        console.log(error);
        this._snackBar.open('Invalid Details','',{
          duration:3000,
          verticalPosition:'top'
        });
      }
    )
  }


}
