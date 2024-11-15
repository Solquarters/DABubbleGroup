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

  constructor() {}
}
