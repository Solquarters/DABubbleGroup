import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-add-avatar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './add-avatar.component.html',
  styleUrl: './add-avatar.component.scss',
})
export class AddAvatarComponent {
  avatarPaths: string[] = [
    'assets/basic-avatars/avatar1.svg',
    'assets/basic-avatars/avatar2.svg',
    'assets/basic-avatars/avatar3.svg',
    'assets/basic-avatars/avatar4.svg',
    'assets/basic-avatars/avatar5.svg',
    'assets/basic-avatars/avatar6.svg',
  ];
  selectedAvatar: string = 'assets/basic-avatars/default-avatar.svg';

  constructor(public authService: AuthService) {}

  changeSelectedPath(path: string) {
    console.log(path);
    this.selectedAvatar = path;
  }
}
