import { NgFor, NgTemplateOutlet } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
} from '@angular/core';

@Component({
  selector: 'app-card',
  template: `
    <div
      class="backgroundClass flex w-fit flex-col gap-3 rounded-md border-2 border-black p-4">
      <ng-content></ng-content>
      <button
        class="rounded-sm border border-blue-500 bg-blue-300 p-2"
        (click)="addNewItem.emit()">
        Add
      </button>
      <section>
        <ng-container *ngFor="let item of items">
          <ng-template
            [ngTemplateOutlet]="rowTemplate"
            [ngTemplateOutletContext]="{ $implicit: item }"></ng-template>
        </ng-container>
      </section>
    </div>
  `,
  styles: [
    `
      :host .backgroundClass {
        background-color: var(--background-color);
      }
    `,
  ],
  standalone: true,
  imports: [NgFor, NgTemplateOutlet],
})
export class CardComponent<T> {
  @Input() items!: T[];
  @Input() rowTemplate!: TemplateRef<any>;

  @Output() addNewItem = new EventEmitter();
}
