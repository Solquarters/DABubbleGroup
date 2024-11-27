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
import { InfoFlyerService } from '../../../core/services/info-flyer.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss',
})
export class ForgotPasswordComponent {
  forgotPasswordForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });
  constructor(
    public authService: AuthService,
    private router: Router,
    private cloudService: CloudService,
    private infoService: InfoFlyerService
  ) {}

  async onSubmit() {
    this.cloudService.loading = true;
    let emailExist: boolean = this.checkIfEmailExists(this.forgotPasswordForm);
    if (this.forgotPasswordForm.valid && emailExist) {
      try {
        await this.authService.resetPassword(this.forgotPasswordForm);
        this.router.navigate(['/login']);
      } catch (error) {
        this.infoService.createInfo('E-Mail senden Fehlgeschlagen', true);
      }
    } else {
      this.infoService.createInfo(
        'E-Mail senden Fehlgeschlagen',
        true
      );
    }
    this.cloudService.loading = false;
  }

  checkIfEmailExists(formGroup: FormGroup): boolean {
    let email = formGroup.value.email;
    let exists: boolean = false;
    for (const member of this.cloudService.members) {
      if (email === member.email) {
        exists = true;
        break;
      }
    }
    return exists;
  }
}