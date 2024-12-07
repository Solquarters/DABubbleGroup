import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.isLoggedIn()) {
    // Benutzer ist NICHT eingeloggt
    router.navigate(['/login'], { replaceUrl: true });
    return false; // Zugriff verweigern
  }
  // Wichtig um User Daten beim Reload zu laden
  authService.loadCurrentUserDataFromLocalStorage();
  return true; // Zugriff gewähren
};
