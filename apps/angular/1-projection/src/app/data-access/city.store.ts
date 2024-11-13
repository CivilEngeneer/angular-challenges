import { computed, Injectable, signal } from '@angular/core';
import { City } from '../model/city.model';
import { FakeHttpService } from './fake-http.service';

@Injectable({
  providedIn: 'root',
})
export class CityStore {
  private _cities = signal<City[]>([]);
  readonly cities = computed(() => this._cities());

  constructor(private http: FakeHttpService) {
    this.http.fetchCities$.subscribe((cities) => {
      this._cities.set(cities);
    });
  }

  addAll(cities: City[]) {
    this._cities.update((c) => [...c, ...cities]);
  }

  addOne(city: City) {
    this._cities.update((c) => [...c, city]);
  }

  deleteOne(id: number) {
    this._cities.update((c) => c.filter((x) => x.id !== id));
  }
}
