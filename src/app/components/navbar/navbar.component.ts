import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLoggedIn=false;
user:any;
constructor(public login:LoginService,private router:Router) { }

ngOnInit(): void {
this.isLoggedIn=this.login.isLogin();
this.user=this.login.getUser();

this.login.loginStatusSubject.asObservable().subscribe(data=>{
this.isLoggedIn=this.login.isLogin();
this.user=this.login.getUser();
});

}

public logout()
{
this.login.logout();
window.location.reload()
}
dashboard()
  {
    if(this.login.getUserRole()=='ADMIN')
      {
    // window.location.href='/admin-dashboard';
    this.router.navigate(['/admin-dashboard']);
      }
      else if(this.login.getUserRole()=='STUDENT')
        {
          // window.location.href='/student-dashboard';
          this.router.navigate(['/student-dashboard']);
        }
        else
        {
          window.location.reload();
          
        }
  }
}
