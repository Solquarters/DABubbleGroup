import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateChannelComponent } from '../../channel/create-channel/create-channel.component';
import { DashboardComponent } from '../dashboard.component';

@Component({
  standalone: true,
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  imports: [CommonModule, CreateChannelComponent, DashboardComponent]
})
export class SidenavComponent {
  isDirectMessagesExpanded = true;
  isChannelsExpanded = true;
  isArrowHovered = false;

  // Sample users data
  users: { name: string; avatar: string }[] = [
    { name: 'Benutzer 1', avatar: 'assets/basic-avatars/avatar-1.png' },
    { name: 'Benutzer 2', avatar: 'assets/basic-avatars/avatar2.png' },
    { name: 'Benutzer 3', avatar: 'assets/basic-avatars/avatar3.png' },
    { name: 'Benutzer 4', avatar: 'assets/basic-avatars/avatar4.png' }
  ];

  // Sample channels data
  channels: { name: string }[] = [
    { name: 'Entwicklerteam' },
    { name: 'Office-Team' }
  ];

  // Method to toggle the profile list visibility
  toggleDirectMessages() {
    this.isDirectMessagesExpanded = !this.isDirectMessagesExpanded;
  }

  // Method to toggle the channels list visibility
  toggleChannels() {
    this.isChannelsExpanded = !this.isChannelsExpanded;
  }
}
