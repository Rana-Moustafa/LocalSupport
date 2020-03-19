import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { resolve } from 'url';
import { catchError, tap } from 'rxjs/operators';
import { throwError, Subject } from 'rxjs';
import { AuthService } from "angularx-social-login";
import { User } from '../auth/user.model';
import { UserStatusService } from '../shared/user-status.service';
import { environment } from '../../environments/environment';

export interface AuthResponseData {
  user_email: string,
  user_display_name: string,
  token: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  user = new Subject<User>();
  private tokenExpirationTimer: any ;

  constructor(private http: HttpClient,
    private router: Router,
    private authService: AuthService,
    private userStatus: UserStatusService) { }

  userRegisteration(userData) {
    let registerationFormData: FormData = new FormData();
    registerationFormData.append('name', userData.username);
    registerationFormData.append('email', userData.email);
    registerationFormData.append('address', userData.address);
    registerationFormData.append('country', userData.country);
    registerationFormData.append('city', userData.city);
    registerationFormData.append('password', userData.password);
    registerationFormData.append('confirm_password', userData.confirmpassword);
    return this.http.post<AuthResponseData>(environment.baseURL + '/wp-json/outdoorf/v1/register',
      registerationFormData
    ).pipe(catchError(this.handleError), tap(resData => {
      this.handleAuthentication(
        resData.user_email,
        resData.user_display_name,
        resData.token);
    }));
  }

  userLogin(userData) {
    let loginFormData: FormData = new FormData();
    loginFormData.append('name', userData.username);
    loginFormData.append('password', userData.password);
    return this.http.post<AuthResponseData>(environment.baseURL + '/wp-json/outdoorf/v1/login',
      loginFormData
    ).pipe(catchError(this.handleError), tap(resData => {
      this.handleAuthentication(
        resData.user_email,
        resData.user_display_name,
        resData.token);
    })
    );
  }


  userGoogleLogin(userData) {

    return this.http.post(environment.baseURL + '/wp-json/outdoorf/v1/google_login',
      userData
    )
  }

  userFacebookLogin(userData) {

    return this.http.post(environment.baseURL + '/wp-json/outdoorf/v1/facebook_login',
      userData
    )
  }

  private handleAuthentication(email: string, name: string, _token: string) {
    const user = new User(
      email,
      name,
      _token
    );
    this.user.next(user);
  }


  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = "An error accurred!";
    if (!errorRes.error || !errorRes.error.message) {
      return throwError(errorMessage);
    }
    errorMessage = errorRes.error.message;
    return throwError(errorMessage);
  }


  autoLogin() {

    const userData: {
      email: string,
      name: string,
      _token: string
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }
    const loadedUser = new User(
      userData.email,
      userData.name,
      userData._token);

    if (loadedUser.token) {
      this.user.next(loadedUser);
    }
    if (localStorage.getItem('token')) {
    }
  }
  userLogout() {
    if (localStorage.getItem('token')) {
      if (JSON.parse(localStorage.getItem('token_type')) == '2' ||
        JSON.parse(localStorage.getItem('token_type')) == '3') {
        this.authService.signOut();
        this.userStatus.userLoggedOut()
        this.router.navigate(['/signin']);
        localStorage.clear()
      }
      //localStorage.removeItem('token');
      //localStorage.removeItem('token_type');
      localStorage.clear()
      this.router.navigate(['/signin']);

      if(this.tokenExpirationTimer){
        clearTimeout(this.tokenExpirationTimer)
      }
      this.tokenExpirationTimer = null;
    }
  }

  autoLogout(expirationDuration) {
   
    let now = new Date()
    let expiredAfter = (new Date(expirationDuration*1000).getTime()) - ((new Date()).getTime());   
  
    setTimeout(() => {
      //console.log('this.tokenExpirationTimer')
      //console.log(this.tokenExpirationTimer)
      this.userLogout();
    }, +expiredAfter)
  }

  isLoggedIn() {
    return !!localStorage.getItem('token')
  }
}
