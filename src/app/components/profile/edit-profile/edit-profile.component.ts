import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [CommonModule], 
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent {
  isEditing = false;
  showProfileDetails = false;

  constructor(private router: Router) {}

  openProfileDetails() {
    this.showProfileDetails = true;
    this.isEditing = false;
  }

  editProfile() {
    this.isEditing = true;
    this.showProfileDetails = false;
  }

  closePopup() {
    this.showProfileDetails = false;
    this.isEditing = false;
  }

  logout() {
    window.location.href = 'index.html';
  }
}
