import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ToDo } from '../models/todo.model';
import { ToDoService } from '../services/todo.service';

@Component({
  standalone: true,
  selector: 'app-todo',
  template: `
    {{ todo.title }}
    <button (click)="update(todo)">Update</button>
    <button (click)="delete(todo.id)">Delete</button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToDoComponent {
  @Input() todo!: ToDo;

  constructor(private todoService: ToDoService) {}

  update(todo: ToDo) {
    this.todoService.update(todo);
  }

  delete(todoId: number) {
    this.todoService.delete(todoId);
  }
}
