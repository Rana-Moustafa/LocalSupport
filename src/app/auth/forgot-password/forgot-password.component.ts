import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ResetPasswordService } from '../../shared/reset-password.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ForgotPasswordComponent implements OnInit {

  @ViewChild('forgotPass', { static: true }) forgotPass: NgForm;
  forgetPassError = false;
  passError;
  forgetPassSuccess = false;

  constructor(private resetPassword: ResetPasswordService) { }

  ngOnInit() {
  }

  forgotPassword(form: NgForm) {

    this.resetPassword.sendForgetPassword(this.forgotPass.value.email).subscribe(data => {
      this.forgotPass.reset();
      this.forgetPassError = false;
      this.forgetPassSuccess = true;
    }, error => {
      this.forgetPassError = true;
      this.forgetPassSuccess = false;
      this.passError = error.error.message;
    });
  }
}
