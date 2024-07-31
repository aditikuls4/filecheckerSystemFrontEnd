import { Component, OnInit } from '@angular/core';
import { StudentService } from 'src/app/service/student.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-approved-request',
  templateUrl: './approved-request.component.html',
  styleUrls: ['./approved-request.component.css']
})
export class ApprovedRequestComponent implements OnInit {
  attachment: [];


  constructor(private studentService: StudentService) { }
  ngOnInit(): void {
  this.loadUsers();
}

loadUsers() {
this.studentService.getAllApprovedRequest().subscribe(
(data:any)=>{
this.attachment=data;
console.log("hi");

console.log(this.attachment);
},
err=>{
Swal.fire('Please try to some later!!','Error to fetching the data','error')
});
}
viewAttachment(attachmentId:String)
{
  console.log(attachmentId);
  
}
}
