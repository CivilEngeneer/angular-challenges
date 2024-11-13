import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { randStudent } from '../../data-access/fake-http.service';
import { StudentStore } from '../../data-access/student.store';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-student-card',
  template: `
    <app-card
      [items]="students()"
      [rowTemplate]="row"
      (addNewItem)="addNewItem()">
      <img src="assets/img/student.webp" width="200px" />
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
      :host {
        --background-color: rgba(0, 250, 0, 0.1);
      }
    `,
  ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CardComponent, AsyncPipe, ListItemComponent],
})
export class StudentCardComponent {
  students = this.store.students;

  constructor(private store: StudentStore) {}

  addNewItem() {
    this.store.addOne(randStudent());
  }

  delete(id: number) {
    this.store.deleteOne(id);
  }
}
