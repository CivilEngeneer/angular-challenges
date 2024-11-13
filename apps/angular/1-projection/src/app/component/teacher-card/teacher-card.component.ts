import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { randTeacher } from '../../data-access/fake-http.service';
import { TeacherStore } from '../../data-access/teacher.store';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-teacher-card',
  template: `
    <app-card
      [items]="teachers() || []"
      [rowTemplate]="row"
      (addNewItem)="addNewItem()">
      <img src="assets/img/teacher.png" width="200px" />
    </app-card>

    <ng-template #row let-item>
      <app-list-item
        [name]="item.firstName"
        [id]="item.id"
        (delete)="delete($event)"></app-list-item>
    </ng-template>
  `,
  styles: [
    `
      :host app-card {
        --background-color: rgba(250, 0, 0, 0.1);
      }
    `,
  ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CardComponent, AsyncPipe, ListItemComponent],
})
export class TeacherCardComponent {
  teachers = this.store.teachers;

  constructor(private store: TeacherStore) {}

  addNewItem() {
    this.store.addOne(randTeacher());
  }

  delete(id: number) {
    this.store.deleteOne(id);
  }
}
