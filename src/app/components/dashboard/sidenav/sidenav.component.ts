import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  standalone: true,
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  imports: [CommonModule]  
})
export class SidenavComponent {
  isChannelsExpanded = true;
  isDirectMessagesExpanded = true;

  // Methode zum Umschalten des Channels-Menüs
 

  // Methode zum Umschalten des Direktnachrichten-Menüs
 
}
