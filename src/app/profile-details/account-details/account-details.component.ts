import { Component, OnInit, ElementRef, ViewChild, EventEmitter, ViewEncapsulation, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CountriesService } from '../../shared/countries.service';
import { UserDataService } from '../../shared/user-data.service';
import { ChangePasswordDataService } from '../../shared/chanegPassword.service';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class AccountDetailsComponent implements OnInit {

  @ViewChild('cPass', { static: true }) changePassForm: NgForm;
  @Output() userProfilePicture: EventEmitter<any> =   new EventEmitter();
  langURL = localStorage.getItem('current_lang');
  countriesList = [];
  formError = false;
  formErrorMsg;
  userData;
  editForm = false;
  closeForm = false;
  changePassword = true;
  userDataDisplayParent;
  HideEditAndChangePass = true;

  constructor(private countries: CountriesService,
              private userDataService: UserDataService,
              private passwordData: ChangePasswordDataService,
              private activeRoute: ActivatedRoute,
              private router: Router) {

    this.userDataService.editFormStatus.subscribe((status) => this.editForm = status );
    this.userDataService.confirmPassStatus.subscribe((status) => this.changePassword = !status );

  }

  ngOnInit() {
    this.activeRoute.queryParams
      .subscribe((params) => {
        //  (params.third_party_reset)
        if(params.third_party_reset != undefined){
          this.changePassword = false;
        }
    });

    this.countriesList = this.countries.countriesData;
    this.userDataService.getUserDetails().subscribe(data => {
      this.userDataDisplayParent = data;
      //  (this.userDataDisplayParent)
      this.sendProfilePicture()

    }, error => {
      //  (error);
      if(error.status === 411){
        this.router.navigate(['/' + this.langURL + '/signin']);
      }
    });

    this.userDataService.profileDataUpdated.subscribe((updated) => {
      this.userDataDisplayParent = updated;
      this.userProfilePicture.emit(this.userDataDisplayParent)
    }, error => {
      //  ('error')
    });
  }
  sendProfilePicture() {
    this.userProfilePicture.emit(this.userDataDisplayParent)
  }
   onHide(val: boolean) {
    this.editForm = val;
  }
  endEditMode(){
    this.editForm = !this.editForm;

  }
  startEditMode(){
    this.editForm = true;
    this.closeForm = !this.closeForm;

  }
  startpasswordEditMode() {
    this.HideEditAndChangePass = false;
    this.changePassword = true;
    this.changePassword = !this.changePassword;
  }

  EndpasswordEditMode() {
    this.changePassword = !this.changePassword;
    this.HideEditAndChangePass = true;
  }

}
