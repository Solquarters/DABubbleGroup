import { Component } from '@angular/core';
import { CloudService } from '../../../core/services/cloud.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  constructor(public cloudService: CloudService) {}

  showData() {
    console.log(this.cloudService.channels);
    console.log(this.cloudService.members);
    console.log(this.cloudService.ids);
  }
}
