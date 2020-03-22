import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonsService } from '../shared/commons.service';
import { filter } from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';
import { TranslationService } from './../shared/translation.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AuthComponent implements OnInit {
  hideMenuMode = true;
  showSignUpForm = false;
  showSigninForm = false;
  showResetPasswordForm = false;
  hideLanguageBanner = false;

  language = [{
    // id: 1,
    lang: 'en'
  },
  {
    // id: 1,
    lang: 'de'
  }
  ]
  constructor(private commons: CommonsService,
    private router: Router, public translate: TranslateService,
    private translation: TranslationService) {

    translate.addLangs(['de', 'en']);
    translate.setDefaultLang('de');
    localStorage.setItem('current_lang', this.translate.defaultLang)
  }

  ngOnInit() {
    this.commons.hide();
    if (this.router.url === '/signup') {
      this.showSignUpForm = true;
    } else if (this.router.url === '/signin') {
      this.showSigninForm = true;
    } else if (this.router.url === '/forgot-password') {
      this.showResetPasswordForm = true;
    }
  }

  hideBanner() {
    this.hideLanguageBanner = true;
  }
  useLanguage(language: string) {
    this.translate.use(language);
  }

}
