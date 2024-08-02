import { CommonModule, NgFor, NgIf } from '@angular/common';
import {
  Component,
  ContentChild,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
} from '@angular/core';
import { ListItemComponent } from '../list-item/list-item.component';

@Component({
  selector: 'app-card',
  template: `
    <div
      class="custom-class flex w-fit flex-col gap-3 rounded-md border-2 border-black p-4">
      <ng-content></ng-content>
      <section>
        <ng-container
          *ngFor="let item of list"
          [ngTemplateOutlet]="itemTemplate"
          [ngTemplateOutletContext]="{ $implicit: item }"></ng-container>
      </section>

      <button
        class="rounded-sm border border-blue-500 bg-blue-300 p-2"
        (click)="itemAdded.emit()">
        Add
      </button>
    </div>
  `,
  standalone: true,
  styles: [
    `
      .custom-class {
        background-color: var(--card-background-color);
      }
    `,
  ],
  imports: [NgIf, NgFor, ListItemComponent, CommonModule],
})
export class CardComponent {
  @Input() list: any[] = [];
  @Output() itemAdded: EventEmitter<number> = new EventEmitter();

  @ContentChild('listItem', { read: TemplateRef })
  itemTemplate!: TemplateRef<any>;
}
