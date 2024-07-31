import { Component, OnInit } from '@angular/core';
import { FileService } from 'src/app/service/file.service';
import { StudentService } from 'src/app/service/student.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pending-request',
  templateUrl: './pending-request.component.html',
  styleUrls: ['./pending-request.component.css']
})
export class PendingRequestComponent implements OnInit {

  attachment=[];
 
  constructor(private studentService: StudentService,private fileService:FileService) { }
  ngOnInit(): void {
  this.loadUsers();
}

loadUsers() {
this.studentService.getAllPendingRequest().subscribe(
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
downloadAttachment(attachmentId: string) {
  this.fileService.downloadAttachment(attachmentId).subscribe(
    (data: any) => {
      this.saveFile(data);
    },
    (error) => {
      console.log(error);
    }
  );
}
 
saveFile(data: any) {
  const blob = new Blob([data], { type: 'application/octet-stream' });
  const downloadURL = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = downloadURL;
  link.download = 'attachment'; // You can provide a default filename here
  document.body.appendChild(link);
  link.click();
  setTimeout(() => {
    document.body.removeChild(link);
    window.URL.revokeObjectURL(downloadURL);
  }, 100);
}

}
