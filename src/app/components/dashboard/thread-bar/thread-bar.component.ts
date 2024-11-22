import { animate, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Output } from '@angular/core';
import { DateSeperatorPipe } from '../chat/pipes/date-seperator.pipe';
import { GetMessageTimePipe } from '../chat/pipes/get-message-time.pipe';
import { ShouldShowDateSeperatorPipe } from '../chat/pipes/should-show-date-seperator.pipe';

@Component({
  selector: 'app-thread-bar',
  standalone: true,
  imports: [DateSeperatorPipe, GetMessageTimePipe, ShouldShowDateSeperatorPipe],
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
