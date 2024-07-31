import { Component, OnInit } from '@angular/core';
import { StudentService } from 'src/app/service/student.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-rejected-request',
  templateUrl: './rejected-request.component.html',
  styleUrls: ['./rejected-request.component.css']
})
export class RejectedRequestComponent implements OnInit {

  attachment=[];
  constructor(private studentService: StudentService) { }
  ngOnInit(): void {
  this.loadUsers();
}

loadUsers() {
this.studentService.getAllRejectedRequest().subscribe(
(data:any)=>{
this.attachment=data;
console.log("getAllRejectedRequest");

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