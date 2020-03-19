import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from 'angularx-social-login';
import { Router } from '@angular/router';
import { GoogleLoginProvider } from 'angularx-social-login';

import { AuthenticationService } from 'src/app/shared/auth.service';
import { UserStatusService } from '../../../shared/user-status.service';
import { UserDataService } from 'src/app/shared/user-data.service';

@Component({
  selector: 'app-google-login',
  templateUrl: './google-login.component.html',
  styleUrls: ['./google-login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class GoogleLoginComponent implements OnInit {

  user: any;
  constructor(private authService: AuthService,
              private router: Router,
              private authenticationService: AuthenticationService,
              private userStatus: UserStatusService,
              private userData: UserDataService) { }

  ngOnInit() {
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(
      (userData) => {

        // Now sign-in with userData

        this.authenticationService.userGoogleLogin(userData).subscribe(data => {
          // console.log('gmail login');
          // console.log(data);
          this.user = data;
          localStorage.setItem('token', JSON.stringify(this.user.token));
          localStorage.setItem('profile_image', this.user.profile_image);
          this.userData.changeProfilePicture(this.user.profile_image);
          localStorage.setItem('token_type', '2');
          localStorage.setItem('id',  JSON.stringify(this.user.id));
          this.userStatus.userLoggedIn();
          this.router.navigate(['']);
          // console.log('this.user.token_expiration_date')
          // console.log(this.user.token_expiration_date)
          this.authenticationService.autoLogout(+this.user.token_expiration_date);
        }, error => {
          this.userStatus.loginError = true;
        });
      }
    );
  }
}
