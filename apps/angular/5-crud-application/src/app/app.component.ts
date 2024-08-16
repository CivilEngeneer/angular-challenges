import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ErrorComponent } from './components/error.component';
import { SpinnerComponent } from './components/spinner.component';
import { ToDoComponent } from './components/todo.conponent';
import { ToDo } from './models/todo.model';
import { ToDoService } from './services/todo.service';

@Component({
  standalone: true,
  imports: [CommonModule, ErrorComponent, ToDoComponent, SpinnerComponent],
  selector: 'app-root',
  template: `
    <ng-container *ngIf="todos$ | async as todos; else spinner">
      <div *ngFor="let todo of todos; trackBy: trackByTitle">
        <app-todo [todo]="todo"></app-todo>
      </div>
    </ng-container>
    <ng-template #spinner>
      <app-spinner></app-spinner>
    </ng-template>
    <app-error></app-error>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  todos$ = this.todoService.todos$;

  constructor(private todoService: ToDoService) {}

  trackByTitle(index: number, todo: ToDo) {
    // setInterval(()=> {console.log}, 1000)
    return todo.title;
  }
}
