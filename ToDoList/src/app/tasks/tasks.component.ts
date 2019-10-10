import {Component, OnInit} from '@angular/core';
import { Task } from './task';
import { TasksService } from '../services/tasks.service';
import { FilesService } from '../services/files.service';
import { ToastrService } from 'ngx-toastr';
import { saveAs } from 'file-saver';

@Component({
    selector: 'app-tasks',
    templateUrl: './tasks.component.html',
    providers: [TasksService]
})

export class TasksComponent implements OnInit {
    tasks: Task[];
    filterTask: Task = { _id: undefined, id: undefined, description: undefined, isResolved: undefined, attached_file: undefined};
    filters: {} = {};
    editTask: Task;
    filterID: false;
    filterDesc: false;
    filterStatus: false;
    selectedFile: File = undefined;

    constructor(private taskService: TasksService, private filesService: FilesService, private toastr: ToastrService) {}

    ngOnInit() {
        this.getTasks();
    }

    // Get all tasks
    getTasks(): void {
        this.taskService.getTasks(this.filterTask).subscribe((tasks: any) => (
            this.tasks = tasks
        ));
    }

    // Add task to list
    add(description: string): void {
        this.editTask = undefined;
        description = description.trim();

        if (!description) {
            return;
        }

        let isResolved = false;
        const newTask: Task = { description, isResolved } as Task;

        // Add task
        this.taskService.addTask(newTask).subscribe(task => {
            if (this.selectedFile) {
                // Add file to task
                this.sendFile(this.selectedFile, task._id.toString(), (resp: any) => {
                    this.selectedFile = undefined;

                    if (resp.success) {
                        task.attached_file = resp.fileNameComplete;
                        this.edit(task);
                        this.update(false);

                        this.toastr.success(`Se agregó la tarea "${task.description}"`, 'Tarea agregada');
                    } else {
                        this.toastr.error(`Se agregó la tarea "${task.description} pero hubo un error
                        al adjuntar archivo. Intente adjuntarlo nuevamente"`, 'Error');
                    }

                    this.getTasks();
                });
            } else {
                this.getTasks();
            }
        });
    }

    // Delete selected task
    delete(task: Task): void {
        this.tasks = this.tasks.filter(t => t !== task);
        this.taskService.deleteTask(task._id).subscribe(() => {
            this.filesService.deleteFile(task._id.toString()).subscribe();

            this.toastr.success(`Se eliminó la tarea "ID ${task.id} - ${task.description}"`, 'Tarea eliminada');
        });
    }

    // Set edition mode
    edit(task) {
        this.editTask = task;
    }

    // Update task is being edited
    update(showMsg: boolean) {
        if (this.editTask) {
            this.taskService.updateTask(this.editTask).subscribe(task => {
               if (showMsg) {
                    this.toastr.success(`Se modificó la tarea "ID ${this.editTask.id} - ${this.editTask.description}"`, 'Tarea modificada');
               }

               this.editTask = undefined;
               this.getTasks();
            });
        }
    }

    // Change task status
    resolved(evt, task) {
        this.edit(task);
        this.update(true);
    }

    // Download task file
    downloadFile(task: Task) {
         this.filesService.getFile(task.attached_file.split('.')[0]).subscribe(
            (res) => {
                saveAs(res, task.attached_file);
            }
          );
    }

    // Add file to task to be created
    addFile(event) {
        if (event.target.files.length > 0) {
            this.selectedFile = event.target.files.item(0);
        }
    }

    // Clear selected file
    clearFile() {
        this.selectedFile = undefined;
    }

    // Attach file to task
    onFileChange(event, task: Task) {
        if (event.target.files.length > 0) {
            // Upload new file
            this.sendFile(event.target.files.item(0), task._id.toString(), (resp: any) => {
                if (resp.success) {
                    task.attached_file = resp.fileNameComplete;
                    this.edit(task);
                    this.update(false);

                    this.toastr.success('Se ha adjuntado el archivo a la tarea', 'Tarea actualizada');
                } else {
                    this.toastr.error(resp.message, 'Error');
                }
            });
        }
    }

    // Delete attached file
    deleteFile(event, task: Task) {
        // Delete file
        this.filesService.deleteFile(task._id.toString()).subscribe((res) => {
            if (res.err) {
                this.toastr.error('Se produjo un error al intentar subir el archivo. Intente nuevamente', 'Error');
            } else {
                task.attached_file = '';
                this.edit(task);
                this.update(false);

                this.toastr.success('Se ha eliminado el archivo adjunto', 'Tarea actualizada');
            }
        });
    }

    // Send file
    sendFile(file: File, fileName: string, callback): any {
        let formData = new FormData();
        let splittedName = file.name.split('.');
        let fileNameComplete = fileName + (splittedName[1] ? '.' + splittedName[1] : '');

        formData.append('file', file, fileNameComplete);

        this.filesService.addFile(formData).subscribe((resp) => {
            if (resp.error_code === 1) {
                callback({
                    success: false,
                    message: 'Se produjo un error al intentar subir el archivo. Intente nuevamente'
                });
            } else {
                callback({
                    success: true,
                    fileNameComplete
                });
            }
        });
    }
}
