import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FileService } from 'src/app/service/file.service';

@Component({
  selector: 'app-attachment',
  templateUrl: './attachment.component.html',
  styleUrls: ['./attachment.component.css']
})
export class AttachmentComponent implements OnInit {
  attachments: any[] = [];
  userId: number;
  constructor(private fileService:FileService,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.userId = +params['userId']; // Get userId from route parameters
      this.loadAttachments();
    });
  }
  loadAttachments() {
    this.fileService.getAttachmentsByUserId(this.userId).subscribe(
      (data: any[]) => {
        this.attachments = data;
      },
      (error) => {
        console.error('Error fetching attachments:', error);
      }
    );
  }

  updateStatus(attachmentId: string, status: string) {
    this.fileService.updateAttachmentStatus(this.userId, attachmentId, status).subscribe(
      (updatedAttachment: any) => {
        console.log('Attachment status updated successfully:', updatedAttachment);
        // Assuming you want to reload attachments after status update
        this.loadAttachments();
      },
      (error) => {
        console.error('Error updating attachment status:', error);
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
