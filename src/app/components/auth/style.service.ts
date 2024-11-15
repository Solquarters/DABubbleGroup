import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StyleService {
  nameSvg = 'assets/icons/person.svg';
  mailSvg = 'assets/icons/mail.svg';
  passwordSvg = 'assets/icons/password.svg';
  placeholderName = 'Name und Nachname';
  placeholderMail = 'beispielname@email.com';
  placeholderPw = 'Passwort';
  placeholderPwConfirm = 'Neues Kennwort bestätigen';
  backArrowSvg = 'assets/icons/back-arrow.svg';

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
  toggleCheckbox(checkbox: HTMLInputElement): void {
    checkbox.checked = !checkbox.checked; // Toggle den Status der Checkbox
  }

  focusPwConfirmInput() {
    this.placeholderPwConfirm = '';
  }

  blurPwConfirmInput() {
    this.placeholderPwConfirm = 'Neues Kennwort bestätigen';
  }
}
