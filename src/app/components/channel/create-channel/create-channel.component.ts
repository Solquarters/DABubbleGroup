import { CommonModule } from '@angular/common';
import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
  


@Component({
  selector: 'app-create-channel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './create-channel.component.html',
  styleUrl: './create-channel.component.scss'
})
export class CreateChannelComponent implements AfterViewInit {
  @ViewChild('description', { static: false }) description: ElementRef | undefined;
  ngAfterViewInit() {
    if (this.description) {
      this.description.nativeElement.addEventListener('input', this.autoResize);
    }
  }
  autoResize = () => {
    const element = this.description?.nativeElement;
    if (element) {
      element.style.height = 'auto'; // Setzt die Höhe zurück, um den Text neu zu berechnen
      element.style.height = element.scrollHeight + 'px'; // Passt die Höhe an den Textinhalt an
    }
  };


  isPopupVisible = false;

  openPopup() {
    this.isPopupVisible = true;
  }

  closePopup() {
    this.isPopupVisible = false;
  }


}