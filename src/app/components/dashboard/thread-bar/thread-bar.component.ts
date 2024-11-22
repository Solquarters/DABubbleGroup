import { animate, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Output } from '@angular/core';
import { DateSeperatorPipe } from '../chat/pipes/date-seperator.pipe';
import { GetMessageTimePipe } from '../chat/pipes/get-message-time.pipe';
import { ShouldShowDateSeperatorPipe } from '../chat/pipes/should-show-date-seperator.pipe';
import { ChatService } from '../../../core/services/chat.service';
import { Message } from '../../../models/interfaces/message.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-thread-bar',
  standalone: true,
  imports: [DateSeperatorPipe, GetMessageTimePipe, ShouldShowDateSeperatorPipe, CommonModule],
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

  messages: Message[]= [];

  @Output() close = new EventEmitter<void>();

  constructor(public chatService: ChatService) {}


  ngOnInit(): void {
    this.messages = this.chatService.messages;
  }

  closeThreadBar() {
    this.close.emit();
  }
}
