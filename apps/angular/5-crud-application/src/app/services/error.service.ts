import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ErrorService {
  private _error$ = new Subject();
  error$ = this._error$.asObservable();

  setError(message: string) {
    this._error$.next(message);
  }
}
