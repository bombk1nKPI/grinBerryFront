import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { User } from '../../lib/model/user';
import { UserService } from '../../services/user.service';
import { Task } from '../../lib/model/task';
import { Observable } from 'rxjs';
import { TodoService } from '../../services/todo.service';
import { TaskDialogComponent } from './task-dialog/task-dialog.component';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  user!: User;
  newTaskTitle: string = '';
  selectedTask: Task | null = null;

  constructor(private userService: UserService,
              private todoService: TodoService,
              public dialog: MatDialog) {}

  ngOnInit(): void {
    this.userService.getUserProfile().subscribe((user: User) => {
      this.user = user;
    });
  }

  addTask(title: string): Observable<Task> {
    const task: Partial<Task> = {
      title: title,
      description: '', // Add appropriate default value
      status: 'IN_PROGRESS', // Assuming a default status
      createdAt: new Date().toISOString(), // Assuming current date as created date
      deadline: '' // Add appropriate default value
    };
    return this.todoService.addTask(task as Task);
  }

  onSubmit(): void {
    if (this.newTaskTitle.trim()) {
      this.addTask(this.newTaskTitle).subscribe({
        next: (newTask: Task) => {
          this.user.tasks.push(newTask);
          this.newTaskTitle = '';
        },
        error: (err) => {
          console.error('Error adding task:', err);
        }
      });
    }
  }

  toggleTaskStatus(task: Task): void {
    task.status = task.status === 'COMPLETED' ? 'IN_PROGRESS' : 'COMPLETED';
    this.todoService.updateTask(task.id, task).subscribe({
      next: (updatedTask: Task) => {
        console.log('Task status updated', updatedTask);
      },
      error: (err) => {
        console.error('Error updating task status:', err);
      }
    });
  }

  openTaskDialog(task: Task): void {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '400px',
      data: task
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.delete) {
          this.deleteTask(result.task);
        } else {
          this.todoService.updateTask(result.id, result).subscribe({
            next: (updatedTask: Task) => {
              const index = this.user.tasks.findIndex(t => t.id === updatedTask.id);
              if (index !== -1) {
                this.user.tasks[index] = updatedTask;
              }
            },
            error: (err) => {
              console.error('Error updating task:', err);
            }
          });
        }
      }
    });
  }

  deleteTask(task: Task): void {
    this.todoService.deleteTask(task.id).subscribe({
      next: () => {
        this.user.tasks = this.user.tasks.filter(t => t.id !== task.id);
        console.log('Task deleted');
      },
      error: (err) => {
        console.error('Error deleting task:', err);
      }
    });
  }
}