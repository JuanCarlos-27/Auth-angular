import { Component, computed, effect, inject } from '@angular/core';
import { AuthService } from './auth/services/auth.service';
import { Router } from '@angular/router';
import { AuthStatus } from './auth/interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor() {
    this.authService.checkAuthStatus().subscribe();
  }

  private authService = inject(AuthService);
  private router = inject(Router);

  public finishAuthChecking = computed<boolean>(() => {
    if (this.authService.authStatus() === AuthStatus.cheking) {
      return false;
    }
    return true;
  });

  public authStatusChangedEffect = effect(() => {
    console.log(this.authService.authStatus());
    if (this.authService.authStatus() === AuthStatus.authenticated) {
      this.router.navigateByUrl('/dashboard');
      return
    }

    if (this.authService.authStatus() === AuthStatus.notAuthenticated) {
      this.router.navigateByUrl('/auth/login');
      return
    }
  });

}
