import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Teacher } from '../model/teacher.model';
import { FakeHttpService } from './fake-http.service';

@Injectable({
  providedIn: 'root',
})
export class TeacherStore {
  private teachers = new BehaviorSubject<Teacher[]>([]);

  get teachers$() {
    this.http.fetchTeachers$.subscribe((t) => this.addAll(t));

    return this.teachers.asObservable();
  }

  constructor(private http: FakeHttpService) {}

  addAll(teachers: Teacher[]) {
    this.teachers.next(teachers);
  }

  addOne(teacher: Teacher) {
    this.teachers.next([...this.teachers.value, teacher]);
  }

  deleteOne(id: number) {
    this.teachers.next(this.teachers.value.filter((t) => t.id !== id));
  }
}
