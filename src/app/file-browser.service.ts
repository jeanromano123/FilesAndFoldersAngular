// file-browser.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FileBrowserService {
  private baseUrl = 'https://localhost:7012/api/FileBrowser/Browse';
  private baseFileUrl = 'https://localhost:7012/api/FileBrowser';
  message: string = '';

  constructor(private http: HttpClient) { }  
    
  getFolders(subfolderName: string): Observable<any> {
      return this.loadFolders(subfolderName);
  }
  
  private loadFolders(subfolderName: string): Observable<any> {
    const params = new HttpParams().set('path', subfolderName);
    return this.http.get<any>(this.baseUrl, { params });
  }  

  uploadFile(file: File): any {
    const formData = new FormData();
    formData.append('file', file);

    this.http.post<string>(this.baseFileUrl, formData,  { observe: 'response' })
      .subscribe(
        (response) => {
          console.log('File upload successful:', response);         
        },
        (error: any) => {
          console.error('Error uploading file:', error);          
        }
      );
  }

  searchFiles(searchQuery: string): Observable<any> {
    const params = new HttpParams().set('searchQuery', searchQuery);
    return this.http.get<any>(`${this.baseUrl}/search`, { params });
  }
  
}