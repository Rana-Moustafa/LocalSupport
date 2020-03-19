import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { CommonsService } from '../../shared/commons.service';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ResetPasswordService } from '../../shared/reset-password.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss', '../auth.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ResetPasswordComponent implements OnInit {

  @ViewChild('resetPass', { static: true }) resetPass: NgForm;
  resetPassParams;
  resetError = false;

  constructor(private commons: CommonsService,
              private activeRoute: ActivatedRoute,
              private resetPasswordService: ResetPasswordService,
              private router: Router) { }

  ngOnInit() {
    this.commons.hide();

    this.activeRoute.queryParams
      .subscribe((params) => {
        this.resetPassParams = params;
      });
  }

  resetPassword(form: NgForm) {
    this.resetPasswordService.sendResetPassword(this.resetPassParams, this.resetPass.value.password).subscribe(data => {
      this.resetPass.reset();
      this.router.navigate(['signin']);
    }, error => {
      this.resetError = true;
      this.resetPass.reset();
    });
  }
}
