import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-spinner',
  template: `
    <span class="spinner"></span>
  `,
  styles: [
    `
      .spinner {
        width: 48px;
        height: 48px;
        border: 5px solid #fff;
        border-bottom-color: #ff3d00;
        border-radius: 50%;
        position: absolute;
        top: 50%;
        left: 50%;
        display: inline-block;
        box-sizing: border-box;
        animation: rotation 1s linear infinite;
      }

      @keyframes rotation {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpinnerComponent {}
