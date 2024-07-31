import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  
  constructor(private http:HttpClient) { }


public addUser(student:any)
{

return this.http.post(`${baseUrl}/user/`,student);

}

public getAllUsers(){
  console.log('Fetching all users...');
  return this.http.get(`${baseUrl}/user/users/all/`);
  }
  getAllPendingRequest() {
    console.log('Fetching all pending request...');
    return this.http.get(`${baseUrl}/pendingFile`);
  }
  getAllApprovedRequest() {
    console.log('Fetching all approvedFile request...');
    return this.http.get(`${baseUrl}/approvedFile`);
  }
  getAllRejectedRequest() {
    console.log('Fetching all rejectedFile request...');
    return this.http.get(`${baseUrl}/rejectedFile`);
  }
  

}
