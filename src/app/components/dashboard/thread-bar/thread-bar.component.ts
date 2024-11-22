import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-thread-bar',
  standalone: true,
  imports: [],
  templateUrl: './thread-bar.component.html',
  styleUrl: './thread-bar.component.scss'
})
export class ThreadBarComponent {
  @Output() close = new EventEmitter<void>();

  closeThreadBar() {
    this.close.emit();
  }
}
