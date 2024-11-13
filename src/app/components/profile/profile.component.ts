import { Component } from '@angular/core';
import { DisplayProfileComponent } from './display-profile/display-profile.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [DisplayProfileComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {

}
