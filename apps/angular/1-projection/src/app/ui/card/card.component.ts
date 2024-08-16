import {
  Component,
  EventEmitter,
  input,
  Output,
  TemplateRef,
} from '@angular/core';
// import { randStudent, randTeacher } from '../../data-access/fake-http.service';
// import { StudentStore } from '../../data-access/student.store';

import { NgFor, NgTemplateOutlet } from '@angular/common';
import { ListItemComponent } from '../list-item/list-item.component';

@Component({
  selector: 'app-card',
  template: `
    <ng-content selector="img"></ng-content>

    <section>
      <ng-container *ngFor="let item of items(); trackBy: itemTrackBy">
        <ng-template
          [ngTemplateOutlet]="template()"
          [ngTemplateOutletContext]="{ $implicit: item }"></ng-template>
      </ng-container>
    </section>

    <button
      class="rounded-sm border border-blue-500 bg-blue-300 p-2"
      (click)="add.emit()">
      Add
    </button>
  `,
  standalone: true,
  host: {
    class: 'flex w-fit flex-col gap-3 rounded-md border-2 border-black p-4',
  },
  imports: [ListItemComponent, NgFor, NgTemplateOutlet],
})
export class CardComponent {
  items = input.required<{ id: number }[] | null>();
  template = input.required<TemplateRef<any>>();

  @Output() add = new EventEmitter();

  itemTrackBy(index: number, item: { id: number }) {
    return item.id;
  }
}
