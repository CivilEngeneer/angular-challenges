import { computed, Injectable, signal } from '@angular/core';
import { Teacher } from '../model/teacher.model';
import { FakeHttpService } from './fake-http.service';

@Injectable({
  providedIn: 'root',
})
export class TeacherStore {
  private _teachers = signal<Teacher[]>([]);
  // private teachers = new BehaviorSubject<Teacher[]>([]);
  readonly teachers = computed(() => this._teachers());

  constructor(private http: FakeHttpService) {
    this.http.fetchTeachers$.subscribe((t) => {
      this._teachers.update((teachers) => [...teachers, ...t]);
    });
  }

  addAll(teachers: Teacher[]) {
    this._teachers.update((t) => [...t, ...teachers]);
  }

  addOne(teacher: Teacher) {
    this._teachers.update((t) => [...t, teacher]);
  }

  deleteOne(id: number) {
    this._teachers.update((t) => t.filter((t) => t.id !== id));
  }
}
