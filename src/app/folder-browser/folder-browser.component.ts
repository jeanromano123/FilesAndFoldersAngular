// folder-browser.component.ts
import { Component, OnInit } from '@angular/core';
import { FileBrowserService } from '../file-browser.service';

interface FileItem {
  name: string;
  size: number;
}

@Component({
  selector: 'app-folder-browser',
  templateUrl: './folder-browser.component.html',
  styleUrls: ['./folder-browser.component.css']
})
export class FolderBrowserComponent implements OnInit {
  folders: string[] = [];  
  selectedFile: any;
  fileContent: string = "";
  path: string = "jeanr";    
  searchQuery: string = '';
  filteredFiles: FileItem[] = [];
  
  files: FileItem[] = [];
  folderCount: number = 0;
  fileCount: number = 0;

  constructor(private fileBrowserService: FileBrowserService) { }

  ngOnInit(): void {
    this.loadFolders(this.path);   
  }  

  loadFolders(path:string): void {
    this.fileBrowserService.getFolders(path).subscribe(
      (response: any) => {
        console.log('API response:', response); // Log the API response for debugging
        if (response && Array.isArray(response.directories) && Array.isArray(response.files)) {
          this.folders = response.directories;  
          this.files = (response.files).map(file => ({
            name: file.name,
            size: file.size 
          }));
          this.files = response.files || [];  
          this.folderCount = this.folders.length;
          this.fileCount = this.files.length;    
        } else {
          console.error('Error: Unexpected response format');
        }
      },
      error => {
        console.error('Error loading folders:', error);        
        this.folders = []; 
      
      }
    );
  }

  filterFiles() {
    this.filteredFiles = this.files.filter(file =>
      file.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    ).map(file => ({
      name: file.name,
      size: file.size 
    }));
    if(this.filteredFiles)
      this.files = [];
  }
 
  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  downloadFile(): void {
    if (this.selectedFile) {
      const url = URL.createObjectURL(this.selectedFile);
      window.open(url, '_blank');
    }
  }

  navigateToFolder(folderName: string): void {
    console.log('folder:', folderName); // Log selectedFile
    this.loadFolders(folderName);
  }


  handleFileInput(event: any): void {
    const file: File = event.target.files[0];
    this.fileBrowserService.uploadFile(file);

    if (this.selectedFile) {
      this.fileBrowserService.uploadFile(this.selectedFile).subscribe(
        (response: any)  => {
          console.log('File uploaded successfully.');       
        },
        (error:any) => {
          console.error('Error uploading file:', error);        
        }
      );
    }
  } 


}

   


  




