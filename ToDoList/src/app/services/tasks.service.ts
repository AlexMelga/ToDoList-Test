import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Task } from '../tasks/task';
import { HttpErrorHandler, HandleError } from '../http-error-handler.service';

@Injectable()
export class TasksService {
  private handleError: HandleError;
  private url = 'http://localhost:3000/api/';

  constructor(private http: HttpClient, httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('TaskService');
  }

  getTasks(filterTask: Task): Observable<Task[]> {
    const { id, description, isResolved } = filterTask;

    let url = this.url + 'tasks?';

    if (id) {
      url = url + `id=${id}&`;
    }

    if (description) {
      url = url + `description=${description}&`;
    }

    if (isResolved) {
      url = url + `isResolved=${isResolved}`;
    }

    return this.http.get<Task[]>(url)
    .pipe(catchError(this.handleError('getTasks', [])));
  }

  addTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.url + 'task', task)
    .pipe(catchError(this.handleError('addTask', task)));
  }

  deleteTask(id: number): Observable<{}> {
    return this.http.delete(this.url + `task?id=${ id }`)
    .pipe(catchError(this.handleError('deleteTask')));
  }

  updateTask(task: Task): Observable<Task> {
    return this.http.put<Task>(this.url + `task?id=${ task._id }`, task)
    .pipe(catchError(this.handleError('updateTask', task)));
  }
}
