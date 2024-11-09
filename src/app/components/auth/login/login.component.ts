import { Component } from '@angular/core';
import { CloudService } from '../../../core/services/cloud.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  constructor(public cloudService: CloudService) {}

  showData() {
    console.log(this.cloudService.channels);
    console.log(this.cloudService.members);
  }
}
