import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserDataService } from '../../../shared/user-data.service';
import { CountriesService } from '../../../shared/countries.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  @ViewChild('ep', { static: true }) editProfileForm: NgForm;
  @Input() editUserData;


  editProfileError = false;
  editProfileErrorMsg;
  usernameText ;
  emailText ;
  addressText ;
  countryText ;
  cityText ;
  updatedInfo;
  countriesList = [];

  constructor(private userDataService: UserDataService,
    		      private countries: CountriesService) {}

  ngOnInit() {
    this.countriesList = this.countries.countriesData;
  }

  onEditProfile(form: NgForm){
    this.userDataService.editUserDetails(this.editProfileForm.value).subscribe(data => {
      //  (data);
      this.updatedInfo = data;
      // this.editProfileForm.reset();
      this.userDataService.editFormStatus.emit(false);
      this.userDataService.profileDataUpdated.emit(this.updatedInfo);
     }, error => {
      this.editProfileError = true;
      this.editProfileErrorMsg = error.error.message;
    });
  }

  endEditMode() {
    this.userDataService.editFormStatus.emit(false);
  }

}
