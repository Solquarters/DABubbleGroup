import { animate, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-thread-bar',
  standalone: true,
  imports: [],
  templateUrl: './thread-bar.component.html',
  styleUrls: ['./thread-bar.component.scss'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateX(100%)' }),
        animate('150ms ease-in-out', style({ transform: 'translateX(0%)' })),
      ]),
      transition(':leave', [
        animate('150ms ease-in-out', style({ transform: 'translateX(100%)' })),
      ]),
    ]),
  ],
})
export class ThreadBarComponent {
  @Output() close = new EventEmitter<void>();

  closeThreadBar() {
    this.close.emit();
  }
}
