import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }
  public loginStatusSubject=new Subject<boolean>();

  //get current login user
  public currentUser()
  {
    return this.http.get(`${baseUrl}/current-user`);
  }


  public generateToken(loginData:any)
  {
    return this.http.post(`${baseUrl}/generate-token`,loginData)
  }

  //login user: set token in local storage
  public loginUser(token)
  {
  localStorage.setItem('token',token);
  return true;
}


//is login ?

public isLogin()
{
  let tokenStr=localStorage.getItem('token');
  if(tokenStr==undefined || tokenStr==null || tokenStr=='')
  {
    return false;
  }
  else
  {
    return true;
  }
}
public logout()
{
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  return true;
}


//get token from local storage
public getToken()
{
  return localStorage.getItem('token');
}

//set user detail to localstorage

public setUser(user)
{
  localStorage.setItem('user',JSON.stringify(user));
}
public getUser()
{
  let usr=localStorage.getItem('user');
  if(usr!=null)
    {
      return JSON.parse(usr);

    }
    else
    {
      this.logout();
      return null;
    }


}

public getUserRole()
{
  let usr=this.getUser();
  return usr.authorities[0].authority;
}

}