import { Component, OnInit } from '@angular/core';
import { FileService } from 'src/app/service/file.service';

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.css']
})
export class StudentDashboardComponent implements OnInit {
  fileStatus = { status: '', requestType: '', percent: 0 };
  filesToUpload: File[] = [];
  attachments: any = [];
 
  constructor(private fileService: FileService) { }

  ngOnInit(): void {

    this.getAttachmentsByStudentId();
  }
    // define a function to upload files
    onUploadFiles(files: File[]): void {
      this.filesToUpload = files;
    }
  
    uploadFiles(): void {
      const formData = new FormData();
      const user = JSON.parse(localStorage.getItem('user'));
const userId = user.id;
      for (const file of this.filesToUpload) {
        formData.append('file', file);
      }
      this.fileService.upload(userId, formData).subscribe(
        response => {
          console.log('Files uploaded successfully:', response);
          window.location.reload();
          // Handle response if needed
        },
        error => {
          console.error('Error uploading files:', error);
          // Handle error if needed
        }
      );
    }

    getAttachmentsByStudentId(): void {
      const user = JSON.parse(localStorage.getItem('user'));
      const userId = user.id;
      this.fileService.getAttachmentsByStudentId(userId).subscribe(
        attachments => {
          this.attachments = attachments;
          console.log('Attachments:', this.attachments);
        },
        error => {
          console.error('Error fetching attachments:', error);
          // Handle error if needed
        }
      );
  
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

