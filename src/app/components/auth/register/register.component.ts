import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CloudService } from '../../../core/services/cloud.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  profileForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    privacyPolicy: new FormControl(false, Validators.requiredTrue),
  });

  constructor(
    public authService: AuthService,
    private router: Router,
    private cloudService: CloudService
  ) {}

  async onSubmit() {
    if (this.profileForm.valid) {
      this.cloudService.loading = true;
      this.authService.profileFormFullfilled = this.profileForm.value;
      try {
        await this.authService.createUser();
        this.router.navigate(['/add-avatar']);
        console.log(this.authService.auth.currentUser);
      } catch (error) {
        alert(error);
      }
      this.cloudService.loading = false;
    }
  }
}

// diese Funktion kreiert neuen user in Authentication
// await this.authService.createUser();
