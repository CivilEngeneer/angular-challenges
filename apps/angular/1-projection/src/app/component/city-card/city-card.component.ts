import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CityStore } from '../../data-access/city.store';
import { randomCity } from '../../data-access/fake-http.service';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';
@Component({
  selector: 'app-city-card',
  template: `
    <app-card
      [items]="cities() || []"
      [rowTemplate]="row"
      (addNewItem)="addNewItem()">
      <img src="assets/img/teacher.png" width="200px" />
    </app-card>

    <ng-template #row let-item>
      <app-list-item
        [name]="item.name"
        [id]="item.id"
        (delete)="delete($event)"></app-list-item>
    </ng-template>
  `,
  styles: [
    `
      :host app-card {
        --background-color: rgba(0, 0, 250, 0.1);
      }
    `,
  ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CardComponent, ListItemComponent],
})
export class CityCardComponent {
  cities = this.store.cities;

  constructor(private store: CityStore) {}

  addNewItem() {
    this.store.addOne(randomCity());
  }

  delete(id: number) {
    this.store.deleteOne(id);
  }
}
