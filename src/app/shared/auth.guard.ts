import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthenticationService } from './auth.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {
  langURL = localStorage.getItem('current_lang');
 constructor( private auth: AuthenticationService,
              private router: Router) {}

  canActivate(): boolean{
    if(this.auth.isLoggedIn()) {
      return true
    } else {
      this.router.navigate(['/' + this.langURL + '/signin']);
      return false
    }
  }
}