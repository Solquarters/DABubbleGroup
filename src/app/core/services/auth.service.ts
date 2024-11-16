import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { environment } from '../../../environments/environments';
import { getAuth } from 'firebase/auth';

@Injectable({
  providedIn: 'root',
})

export class AuthService {
  private app = initializeApp(environment);
  auth = getAuth(this.app);
  nameSvg = 'assets/icons/person.svg';
  mailSvg = 'assets/icons/mail.svg';
  passwordSvg = 'assets/icons/password.svg';
  placeholderName = 'Name und Nachname';
  placeholderMail = 'beispielname@email.com';
  placeholderPw = 'Passwort';
  placeholderPwConfirm = 'Neues Kennwort bestätigen';
  backArrowSvg = 'assets/icons/back-arrow.svg';
  registerNameValue: string = "";
  registerMailValue: string = "";
  registerPwValue: string = "";

  constructor() {}

  focusNameInput() {
    this.nameSvg = 'assets/icons/person-bold.svg';
    this.placeholderName = '';
  }

  blurNameInput() {
    this.nameSvg = 'assets/icons/person.svg';
    this.placeholderName = 'Name und Nachname';
  }
  focusMailInput() {
    this.mailSvg = 'assets/icons/mail-bold.svg';
    this.placeholderMail = '';
  }

  blurMailInput() {
    this.mailSvg = 'assets/icons/mail.svg';
    this.placeholderMail = 'beispielname@email.com';
  }

  focusPwInput() {
    this.passwordSvg = 'assets/icons/password-bold.svg';
    this.placeholderPw = '';
  }

  blurPwInput() {
    this.passwordSvg = 'assets/icons/password.svg';
    this.placeholderPw = 'Passwort';
  }

  backArrowBlack() {
    setTimeout(() => {
      this.backArrowSvg = 'assets/icons/back-arrow.svg';
    }, 75);
  }

  backArrowPurple() {
    setTimeout(() => {
      this.backArrowSvg = 'assets/icons/back-arrow-purple.svg';
    }, 75);
  }
  toggleCheckbox(event: MouseEvent, checkbox: HTMLInputElement): void {
    console.log("hello");
    
    if (event.target === checkbox) {
      return;
  }
    checkbox.checked = checkbox.checked; // Toggle den Status der Checkbox
  }

  focusPwConfirmInput() {
    this.placeholderPwConfirm = '';
  }

  blurPwConfirmInput() {
    this.placeholderPwConfirm = 'Neues Kennwort bestätigen';
  }
}
