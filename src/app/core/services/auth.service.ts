import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { environment } from '../../../environments/environments';
import {
  getAuth,
  createUserWithEmailAndPassword,
  UserCredential,
} from 'firebase/auth';
import { User } from '../../models/user.model';
import { addDoc, updateDoc } from 'firebase/firestore';
import { CloudService } from './cloud.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private app = initializeApp(environment);
  auth = getAuth(this.app);
  user!: any;
  nameSvg = 'assets/icons/person.svg';
  mailSvg = 'assets/icons/mail.svg';
  passwordSvg = 'assets/icons/password.svg';
  placeholderName = 'Name und Nachname';
  placeholderMail = 'beispielname@email.com';
  placeholderPw = 'Passwort';
  placeholderPwConfirm = 'Neues Kennwort bestätigen';
  backArrowSvg = 'assets/icons/back-arrow.svg';
  registerNameClicked = false;
  registerEmailClicked = false;
  registerPasswordClicked = false;
  registerCheckboxClicked = false;
  registerNameValue: string = '';
  registerMailValue: string = '';
  registerPasswordValue: string = '';
  registerCheckbox: boolean = false;

  profileFormFullfilled!: any;

  newUser!: User;

  constructor(private cloudService: CloudService) {
  }

  async createUser() {
    const userCredential = await createUserWithEmailAndPassword(
      this.auth,
      this.profileFormFullfilled.email,
      this.profileFormFullfilled.password
    )
    // login user
    this.user = userCredential.user;
    console.log(this.user);
    
    this.createNewUserForCollection(userCredential);
    await this.createMemberData();
  }

  createNewUserForCollection(userCredential: UserCredential) {
    const createdAt = new Date();
    this.newUser = new User(
      userCredential.user.email,
      userCredential.user.uid,
      this.profileFormFullfilled.name,
      true,
      'src/assets/basic-avatars/default-avatar.svg',
      createdAt,
      createdAt
    );
  }

  async createMemberData() {
    await addDoc(this.cloudService.getRef('members'), this.newUser.toJson());
  }

  async updateMemberAvatar(id: string, path: string) {
    await updateDoc(this.cloudService.getSingleRef('members', id), {
      avatarUrl: path,
    });
  }

  focusNameInput() {
    this.nameSvg = 'assets/icons/person-bold.svg';
    this.placeholderName = '';
  }

  blurNameInput(component: string) {
    this.nameSvg = 'assets/icons/person.svg';
    this.placeholderName = 'Name und Nachname';
    if (component == 'register') {
      this.registerNameClicked = true;
    } else if (component == 'login') {
    } else {
    }
  }
  focusMailInput() {
    this.mailSvg = 'assets/icons/mail-bold.svg';
    this.placeholderMail = '';
  }

  blurMailInput(component: string) {
    this.mailSvg = 'assets/icons/mail.svg';
    this.placeholderMail = 'beispielname@email.com';
    if (component == 'register') {
      this.registerEmailClicked = true;
    } else if (component == 'login') {
    } else {
    }
  }

  focusPwInput() {
    this.passwordSvg = 'assets/icons/password-bold.svg';
    this.placeholderPw = '';
  }

  blurPwInput(component: string) {
    this.passwordSvg = 'assets/icons/password.svg';
    this.placeholderPw = 'Passwort';
    if (component == 'register') {
      this.registerPasswordClicked = true;
    } else if (component == 'login') {
    } else {
    }
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
    if (event.target === checkbox) {
      return;
    }
    this.registerCheckboxClicked = true;
    checkbox.checked = checkbox.checked; // Toggle den Status der Checkbox
  }

  focusPwConfirmInput() {
    this.placeholderPwConfirm = '';
  }

  blurPwConfirmInput() {
    this.placeholderPwConfirm = 'Neues Kennwort bestätigen';
  }
}
