import { AsyncPipe, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
} from '@angular/core';
import { ErrorService } from '../services/error.service';

@Component({
  selector: 'app-error',
  template: `
    <div *ngIf="error$ | async as error" class="content">
      {{ error }}
    </div>
  `,
  styles: `
    :host {
      position: absolute;
      left: 50%;
      transform: translateY(-50%);
      top: 1px;

      .content {
        border: solid 1px black;
        background-color: white;
        color: red;
        padding: 3px;
      }
    }
  `,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AsyncPipe, NgIf],
})
export class ErrorComponent {
  error$ = this.errorService.error$;

  @HostListener('window:click', ['$event.target'])
  onClick(target: HTMLElement) {
    if (target !== this.host.nativeElement) {
      this.errorService.setError('');
    }
  }

  constructor(
    private errorService: ErrorService,
    private host: ElementRef,
  ) {}
}
