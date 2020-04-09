import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonsService } from '../../shared/commons.service';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-newsletter',
  templateUrl: './newsletter.component.html',
  styleUrls: ['./newsletter.component.scss']
})
export class NewsletterComponent implements OnInit {
  @ViewChild('newsletter', { static: true }) newsletter: NgForm;

  formError = false;
  formErrorMsg;
  email;
  userData;
  isLoading = false;
  alreadyRegistered = false;
  successRegistered = false;
  mailNotValid = false;
  constructor(private router: Router,
              private route: ActivatedRoute,
              private commons: CommonsService) { }

  ngOnInit() {
  }

  onUserSubscribe(newsletter) {
    this.alreadyRegistered = false;
    this.successRegistered = false;
    this.mailNotValid = false;

    this.commons.postSubscribtion(newsletter.value.email).subscribe(data => {
      //  (data);
      this.userData = data;
      if (this.userData.status === 400 && this.userData.title === 'Member Exists') {
        this.alreadyRegistered = true;
      } else {
        this.successRegistered = true;
      }
      this.newsletter.reset();
    }, (error) => {
      //  (error);
      if (error.error.data.status === 400) {
        this.mailNotValid = true;
      } else {
        this.formError = true;
      }
      this.formErrorMsg = error;
      this.isLoading = false;
    });
  }
}
