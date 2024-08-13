import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { City } from '../model/city.model';
import { FakeHttpService } from './fake-http.service';

@Injectable({
  providedIn: 'root',
})
export class CityStore {
  private cities = new BehaviorSubject<City[]>([]);
  get cities$() {
    this.http.fetchCities$.subscribe((c) => this.addAll(c));

    return this.cities.asObservable();
  }

  constructor(private http: FakeHttpService) {}

  addAll(cities: City[]) {
    this.cities.next(cities);
  }

  addOne(student: City) {
    this.cities.next([...this.cities.value, student]);
  }

  deleteOne(id: number) {
    this.cities.next(this.cities.value.filter((s) => s.id !== id));
  }
}
