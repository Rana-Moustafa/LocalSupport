import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { CountriesService } from '../../shared/countries.service';
import { AuthenticationService } from 'src/app/shared/auth.service';
import { UserDataService } from 'src/app/shared/user-data.service';

@Component({
  selector: 'app-registeration',
  templateUrl: './registeration.component.html',
  styleUrls: ['./registeration.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RegisterationComponent implements OnInit {

  @ViewChild("f", { static: true }) signupForm: NgForm;
  langURL = localStorage.getItem('current_lang');
  countriesList = [];
  formError = false;
  formErrorMsg;
  userData;
  isLoading = false;

  constructor(
    private countries: CountriesService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthenticationService,
    public userDataService: UserDataService) { }

  ngOnInit() {
    this.countriesList = this.countries.countriesData;
  }

  onUserRegister(form: NgForm) {
    this.isLoading = true;

    this.authService.userRegisteration(this.signupForm.value).subscribe(data => {
      this.isLoading = false;
      this.userData = data;
      localStorage.setItem('token', JSON.stringify(this.userData.token));
      localStorage.setItem('profile_image', JSON.stringify(this.userData.profile_image));
      localStorage.setItem('token_type', JSON.stringify(1));
      localStorage.setItem('id', JSON.stringify(this.userData.id));
      this.userDataService.changeProfilePicture(this.userData.profile_image);
      this.signupForm.reset();
      this.router.navigate([this.langURL + '/add-new-place']);
      this.authService.autoLogout(this.userData.token_expiration_date);
    }, (errorMessage) => {
      this.formError = true;
      this.formErrorMsg = errorMessage;
      this.isLoading = false;
    });
  }

}
