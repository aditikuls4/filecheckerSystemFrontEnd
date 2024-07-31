import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class FileService {


  constructor(private http: HttpClient) {}

  // define function to upload files
  upload(userId: string, formData: FormData): Observable<HttpEvent<any>> {
    return this.http.post(`${baseUrl}/users/${userId}/upload`, formData, {
      reportProgress: true,
      observe: 'events'
    });
    
}


getAttachmentsByStudentId(userId: number) {
  return this.http.get(`${baseUrl}/users/${userId}/attachments`);
}









downloadAttachment(attachmentId: string): Observable<any> {
  return this.http.get(`${baseUrl}/download/${attachmentId}`, {
    responseType: 'blob'
  });
}
getAttachmentsByUserId(userId: number) {
  return this.http.get(`${baseUrl}/users/${userId}/attachments`);
}
updateAttachmentStatus(userId: number, attachmentId: string, status: string) {
  return this.http.put(`${baseUrl}/users/${userId}/attachments/${attachmentId}/${status}`, {});
}

}