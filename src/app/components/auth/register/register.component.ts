import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

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
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(7),
    ]),
    privacyPolicy: new FormControl(false, Validators.requiredTrue),
  });

  constructor(public authService: AuthService) {}

  onSubmit() {
    if (this.profileForm.valid) {
      // Formular ist gültig, du kannst die Daten verarbeiten oder weiterleiten
      console.log('Formular ist gültig:', this.profileForm.value);
    } else {
      // Formular ist ungültig, zeige eine Fehlermeldung oder entsprechende Logik
      console.log('Formular ist ungültig');
    }
  }
}
