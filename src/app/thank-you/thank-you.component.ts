import { Component, OnInit } from '@angular/core';
import { CommonsService } from './../shared/commons.service';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslationService } from '../shared/translation.service';

@Component({
  selector: 'app-thank-you',
  templateUrl: './thank-you.component.html',
  styleUrls: ['./thank-you.component.scss']
})
export class ThankYouComponent implements OnInit {
  thankYouNames;
  langURL = localStorage.getItem('current_lang');
  constructor(
    private commons: CommonsService,
    private router: Router,
    private route: ActivatedRoute,
    private translation: TranslationService) { }

  ngOnInit() {
    this.commons.show();
    this.router.navigateByUrl(this.router.url.replace(this.route.snapshot.params.language, this.commons.getCurrentLanguage()));
    this.translation.langUpdated.subscribe(
      (lang) => {
        this.router.navigateByUrl(this.router.url.replace(this.route.snapshot.params.language, lang));
      }
    );
  }
}
