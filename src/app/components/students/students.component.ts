import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Student } from 'src/app/modal/Student';
import { StudentService } from 'src/app/service/student.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {

  users=[
    {
      userId:'',
    username: '',
    password: '',
    email: '',
    firstName: '',
    lastName: '',
    phoneNo: '',
    profile: '',
    role:'',
    enabled:'',
    }
    ];
    displayedColumns: string[] = ['username', 'email', 'fullName', 'phoneNo', 'profile','role','enabled'];
    constructor(private userService: StudentService,private router: Router) { }
    
    ngOnInit(): void {
    this.loadUsers();
    }
    
    loadUsers() {
    this.userService.getAllUsers().subscribe(
    (data:any)=>{
    this.users=data
    },
    err=>{
    Swal.fire('Please try to some later!!','Error to fetching the data','error')
    });
    }
    
    
    
    viewAttachementByUserId(userId: number) {
      this.router.navigate(['/attachments', userId]);
    }

  
}
