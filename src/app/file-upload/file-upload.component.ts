import { Component, OnInit } from '@angular/core'; 
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { Observable } from 'rxjs';
import { StudentDto } from './student';
  
@Component({ 
    selector: 'app-file-upload', 
    templateUrl: './file-upload.component.html', 
    styleUrls: ['./file-upload.component.scss'] 
}) 
export class FileUploadComponent implements OnInit { 
  
    // Variable to store shortLink from api response 
    status:  'initial' | 'uploading' | 'success' | 'fail' = 'initial';
    file: File | null = null;
     detail: StudentDto[];
     selectedValue:any="defaultSort";
     timeTaken: any;
     dataRetrived:boolean=false;
  
    constructor(private http: HttpClient) {}
  
    ngOnInit(): void {}
  
    onChange(event: any) {
      const file: File = event.target.files[0];
  
      if (file) {
        this.status = 'initial';
        this.file = file;
      }
    }

    onSelect(vale:any){

    }
   
    getMyDtos(formData:any,url:any): Observable<StudentDto[]> {
     // this.http.post<StudentDtop[]>("","").pipe(map(r=>r.map))
      return this.http.post<StudentDto[]>(url,formData).pipe(
        catchError((error: HttpErrorResponse) => {
          console.error(error); // Log the error
  
          // Show user-friendly error message
          this.status = 'fail';
  
          // Provide alternative data (optional)
          // ...
  
          return throwError(error);
        })
      );
      
    }
    onUploadSave(){
      let startFrom = new Date().getTime();         

      if (this.file) {
        const formData = new FormData();
        
        formData.append('file', this.file, this.file.name);
       this.getMyDtos(formData,"http://localhost:8080/upload-sort?sortType="+this.selectedValue+"&save=true").subscribe(
        data=>{
          console.log(data)
          this.detail=data;
          this.dataRetrived=true;
          console.log(this.detail);
        }
       );

    }
    this.timeTaken=new Date().getTime() - startFrom
  }
  
    onUpload() {
      let startFrom = new Date().getTime();    
      if (this.file) {
        const formData = new FormData();
        
        formData.append('file', this.file, this.file.name);
       this.getMyDtos(formData,"http://localhost:8080/upload-sort?sortType="+this.selectedValue+"&save=false").subscribe(
        data=>{
          console.log(data)
          this.detail=data;
          console.log(this.detail);
          
        }
       );
       this.timeTaken=new Date().getTime() - startFrom
      }
       
        
        
  
      /* const upload$ = this.http.post('http://localhost:8080/upload-sort?sortType=mergeSort&save=false', formData);
  
        this.status = 'uploading';

  
        upload$.subscribe({
          next: () => {
            this.status = 'success';
       //     this.data
          },
          error: (error: any) => {
            this.status = 'fail';
            console.log(error);
            return throwError(() => error);
          },
        });
      }*/
    }
    
} 