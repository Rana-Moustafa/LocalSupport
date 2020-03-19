import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'angularx-social-login';
import { SocialUser } from 'angularx-social-login';
import { FacebookLoginProvider } from 'angularx-social-login';
import { AuthenticationService } from 'src/app/shared/auth.service';
import { UserStatusService } from '../../../shared/user-status.service';
import { UserDataService } from 'src/app/shared/user-data.service';

declare var FB: any;

@Component({
  selector: 'app-facebook-login',
  templateUrl: './facebook-login.component.html',
  styleUrls: ['./facebook-login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FacebookLoginComponent implements OnInit {

  private user: SocialUser;
  private loggedIn: boolean;
  facebookUser;

  constructor(private authService: AuthService,
              private router: Router,
              private authenticationService: AuthenticationService,
              private userStatus: UserStatusService,
              private userData: UserDataService) { }

  ngOnInit() {
  }

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then(
      (userData) => {
        // Now sign-in with userData
        this.authenticationService.userFacebookLogin(userData).subscribe(data => {
          this.facebookUser = data;
          // console.log('facebook login');
          // console.log(this.facebookUser);
          localStorage.setItem('token', JSON.stringify(this.facebookUser.token));
          localStorage.setItem('profile_image', this.facebookUser.profile_image);
          this.userData.changeProfilePicture(this.facebookUser.profile_image);
          localStorage.setItem('token_type', '3');
          localStorage.setItem('id',  JSON.stringify(this.facebookUser.id));
          this.userStatus.userLoggedIn();
          this.router.navigate(['']);
          this.authenticationService.autoLogout(this.facebookUser.token_expiration_date);
        }, error => {
          ////// console.log(error);
          this.userStatus.loginError = true;
        });
      }
    );
  }
}
