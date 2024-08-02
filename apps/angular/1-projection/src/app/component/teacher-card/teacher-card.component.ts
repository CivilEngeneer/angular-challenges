import { Component, OnInit } from '@angular/core';
import {
  FakeHttpService,
  randTeacher,
} from '../../data-access/fake-http.service';
import { TeacherStore } from '../../data-access/teacher.store';
import { Teacher } from '../../model/teacher.model';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-teacher-card',
  template: `
    <app-card [list]="teachers" (itemAdded)="addItem()">
      <img src="assets/img/teacher.png" width="200px" />

      <ng-template #listItem let-item>
        <app-list-item
          [name]="item.firstName"
          [id]="item.id"
          (deleteClicked)="deleteItem(item.id)"></app-list-item>
      </ng-template>
    </app-card>
  `,
  styles: [
    `
      :host app-card {
        --card-background-color: rgba(250, 0, 0, 0.1);
      }
    `,
  ],
  standalone: true,
  imports: [CardComponent, ListItemComponent],
})
export class TeacherCardComponent implements OnInit {
  teachers: Teacher[] = [];

  constructor(
    private http: FakeHttpService,
    private store: TeacherStore,
  ) {}

  ngOnInit(): void {
    this.http.fetchTeachers$.subscribe((t) => this.store.addAll(t));

    this.store.teachers$.subscribe((t) => (this.teachers = t));
  }

  deleteItem(id: number) {
    this.store.deleteOne(id);
  }

  addItem() {
    this.store.addOne(randTeacher());
  }
}
