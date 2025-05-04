import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const currentUser = this.authService.currentUserValue;
    if (currentUser) {
      // Check if the user has the appropriate role
      if (route.data.roles && route.data.roles.indexOf(currentUser.UserRole) === -1) {
        // Role not authorized, redirect to error page
        this.router.navigate(['/error']);
        return false;
      }
      // Authorized, return true
      return true;
    }

    // Not logged in, redirect to login page
    this.router.navigate(['/login']);
    return false;
}
}
