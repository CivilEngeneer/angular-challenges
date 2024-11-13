import { computed, Injectable, signal } from '@angular/core';
import { Student } from '../model/student.model';
import { FakeHttpService } from './fake-http.service';

@Injectable({
  providedIn: 'root',
})
export class StudentStore {
  private _students = signal<Student[]>([]);
  readonly students = computed(() => this._students());

  constructor(private http: FakeHttpService) {
    this.http.fetchStudents$.subscribe((students) => {
      this._students.set(students);
    });
  }

  addAll(students: Student[]) {
    this._students.update((s) => [...s, ...students]);
  }

  addOne(student: Student) {
    this._students.update((s) => [...s, student]);
  }

  deleteOne(id: number) {
    this._students.update((s) => s.filter((x) => x.id !== id));
  }
}
