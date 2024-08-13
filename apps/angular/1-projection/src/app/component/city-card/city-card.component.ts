import { AsyncPipe, NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CityStore } from '../../data-access/city.store';
import { randomCity } from '../../data-access/fake-http.service';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-city-card',
  template: `
    <app-card
      class="bg-light-blue"
      [items]="cities$ | async"
      [template]="temp"
      (add)="add()">
      <img src="assets/img/city.png" width="200px" />

      <ng-template #temp let-item>
        <app-list-item
          [name]="item.name"
          [id]="item.id"
          (delete)="delete(item.id)"></app-list-item>
      </ng-template>
    </app-card>
  `,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CardComponent, AsyncPipe, ListItemComponent, NgFor],
  styles: [
    `
      .bg-light-blue {
        background-color: rgba(0, 0, 250, 0.1);
      }
    `,
  ],
})
export class CityCardComponent {
  cities$ = this.store.cities$;

  constructor(private store: CityStore) {}

  add() {
    this.store.addOne(randomCity());
  }

  delete(id: number) {
    this.store.deleteOne(id);
  }
}
