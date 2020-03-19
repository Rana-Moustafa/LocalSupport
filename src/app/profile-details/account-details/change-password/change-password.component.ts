import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ChangePasswordDataService } from '../../../shared/chanegPassword.service';
import { UserDataService } from '../../../shared/user-data.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  changePassword;
  emailDone = true;
  emailEror = true;
  HideEditAndChangePass = false;
  @ViewChild('cPass', { static: true }) changePassForm: NgForm;
  changePassError = false;
  changePassErrorMsg;

  constructor(private passwordData: ChangePasswordDataService,
              private userDataService: UserDataService) {
  }

  ngOnInit() {
  }
  onChangePass(form: NgForm) {
    this.passwordData.getPasswordDetails(this.changePassForm.value).subscribe(data => {
      this.changePassForm.reset();
      // this.userDataService.confirmPassStatus.emit(true)
      this.emailDone = false;
      this.emailEror = true;
      // console.log("changed");
    }, error => {
      this.emailEror = true;
      this.changePassForm.reset();
      this.changePassErrorMsg = error.error.message;
      // console.log("not changed");
      this.emailDone = true;
      this.emailEror = false;
    });
  }
}
