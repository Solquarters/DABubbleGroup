import { Component, EventEmitter, Output ,Input } from '@angular/core';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-display-profile',
  standalone: true,
  imports: [CommonModule], 
  templateUrl: './display-profile.component.html',
  styleUrls: ['./display-profile.component.scss']
})
export class DisplayProfileComponent {
  // Beispiel-Daten (später aus der DB)
  @Input() data: any; 
  @Output() edit = new EventEmitter<void>();

  editProfile(event: Event) {
    event.preventDefault(); // Verhindert die Navigation
    console.log('Profil bearbeiten');
    this.edit.emit(); 
  }
  

  closeProfile() {
    console.log('Profil schließen');
  }


  getStatusText() {
    return this.data.status === 'active' ? 'Aktiv' : 'Abwesend';
  }
}
