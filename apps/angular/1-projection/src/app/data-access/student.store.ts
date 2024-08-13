import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Student } from '../model/student.model';
import { FakeHttpService } from './fake-http.service';

@Injectable({
  providedIn: 'root',
})
export class StudentStore {
  private students = new BehaviorSubject<Student[]>([]);
  get students$() {
    this.http.fetchStudents$.subscribe((s) => this.addAll(s));

    return this.students.asObservable();
  }

  constructor(private http: FakeHttpService) {}

  addAll(students: Student[]) {
    this.students.next(students);
  }

  addOne(student: Student) {
    this.students.next([...this.students.value, student]);
  }

  deleteOne(id: number) {
    this.students.next(this.students.value.filter((s) => s.id !== id));
  }
}
