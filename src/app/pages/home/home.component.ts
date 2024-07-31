import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private loginService:LoginService,private router:Router) { }

  ngOnInit(): void {
  }
  onHome()
  {
    if(this.loginService.getUserRole()=='ADMIN')
      {
    // window.location.href='/admin-dashboard';
    this.router.navigate(['/admin-dashboard']);
      }
      else if(this.loginService.getUserRole()=='STUDENT')
        {
          // window.location.href='/student-dashboard';
          this.router.navigate(['/student-dashboard']);
        }
        else
        {
          window.location.reload();
          
        }
  }
  onsignup() {
    this.router.navigate(['/signup']).then(() => {
      this.router.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
          window.location.reload();
        }
      });
    });
  }
onlogin()
{
  this.router.navigate(['/login']).then(() => {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        window.location.reload();
      }
    });
  });

}
}
