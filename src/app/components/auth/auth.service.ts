import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  nameSvg = 'assets/icons/person.svg';
  mailSvg = 'assets/icons/mail.svg';
  passwordSvg = 'assets/icons/password.svg';
  placeholderName = 'Name und Nachname';
  placeholderMail = 'beispielname@email.com';
  placeholderPw = 'Passwort';

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
}
