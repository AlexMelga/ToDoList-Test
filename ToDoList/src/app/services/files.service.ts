import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { HttpErrorHandler, HandleError } from '../http-error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class FilesService {
  private handleError: HandleError;
  private url = 'http://localhost:3000/api/';

  constructor(private http: HttpClient, httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('FilesService');
   }

  addFile(formData: FormData): any {
    return this.http.post(this.url + 'upload', formData)
    .pipe(catchError(this.handleError('addFile', [])));
  }

  getFile(fileName: string): any {
    return this.http.get(this.url + `file?name=${ fileName }`, {responseType: 'blob'})
    .pipe(catchError(this.handleError('getFile', [])));
  }

  deleteFile(fileName: string): any {
    return this.http.delete(this.url + `file?name=${ fileName }`)
    .pipe(catchError(this.handleError('deleteFile', [])));
  }
}
