import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AuthenticationService } from 'src/app/shared/auth.service';
import { UserStatusService } from '../../shared/user-status.service';
import { UserDataService } from 'src/app/shared/user-data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {

  @ViewChild('lg', { static: true }) loginForm: NgForm;

  formError = false;
  formErrorMsg;
  userData;
  isLoading = false;
  newProfilePicture;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthenticationService,
    public userStatus: UserStatusService,
    public userDataService: UserDataService) { }

  ngOnInit() {
  }

  onUserLogin(form: NgForm) {
    this.isLoading = true;
    this.authService.userLogin(this.loginForm.value).subscribe(data => {
      this.isLoading = false;
      this.userData = data;
      localStorage.setItem('token', JSON.stringify(this.userData.token));
      localStorage.setItem('profile_image', this.userData.profile_image);
      this.userDataService.changeProfilePicture(this.userData.profile_image);
      localStorage.setItem('id', JSON.stringify(this.userData.id));
      this.loginForm.reset();
      this.router.navigate(['']);
      // this.newProfilePicture = this.userData.profile_image;
      // this.userDataService.changeProfilePicture(this.newProfilePicture);
      // this.authService.autoLogout(this.userData.token_expiration_date)
    }, (errorMessage) => {
      this.formError = true;
      this.formErrorMsg = errorMessage;
      this.isLoading = false;
    });
  }
}
