import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { randText } from '@ngneat/falso';
import { map, Observable, Subject, switchMap, take } from 'rxjs';
import { ToDo } from '../models/todo.model';
import { ErrorService } from './error.service';

@Injectable({ providedIn: 'root' })
export class ToDoService {
  private todosSubject$ = new Subject<ToDo[]>();
  todos$ = this.todosSubject$.asObservable();

  constructor(
    private http: HttpClient,
    private errorService: ErrorService,
  ) {
    this.init();
  }

  init() {
    this.http
      .get<ToDo[]>('https://jsonplaceholder.typicode.com/todos')
      .subscribe({
        next: (todos: ToDo[]) => {
          this.todosSubject$.next(todos);
        },
        error: (error) => {
          this.errorService.setError(error);
        },
      });
  }

  update(todo: ToDo) {
    this.http
      .put<ToDo>(
        `https://jsonplaceholder.typicode.com/todos/${todo.id}`,
        JSON.stringify({
          todo: todo.id,
          title: randText(),
          body: todo.body,
          userId: todo.userId,
        }),
        {
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        },
      )
      .pipe(switchMap((todo) => this.updateState(todo)))
      .subscribe({
        next: (todos: ToDo[]) => {
          this.todosSubject$.next(todos);
        },
        error: (error) => {
          this.errorService.setError(error);
        },
      });
  }

  delete(todoId: number) {
    this.http
      .delete(`https://jsonplaceholder.typicode.com/todos/${todoId}`)
      .subscribe({
        error: (error) => {
          this.errorService.setError(error);
        },
      });
  }

  private updateState(todoUpdated: ToDo): Observable<ToDo[]> {
    return this.todosSubject$.pipe(
      take(1),
      map((todos) => {
        todos[todoUpdated.id - 1] = todoUpdated;
        return todos;
      }),
    );
  }
}
