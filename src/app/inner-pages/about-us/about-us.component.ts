import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonsService } from 'src/app/shared/commons.service';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { TranslationService } from '../../shared/translation.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AboutUsComponent implements OnInit {
  aboutContent;
  langURL = localStorage.getItem('current_lang');
  isLoading;
  constructor(
    private commons: CommonsService,
    public translate: TranslateService,
    private translation: TranslationService,
    private router: Router,
    private route: ActivatedRoute) {

    translate.onLangChange.subscribe((event: LangChangeEvent) => {
      console.log(event.lang);
      this.router.navigateByUrl(this.router.url.replace(this.route.snapshot.params.language,
        event.lang)).then(() => {
          this.getAbout(event.lang);
        });
    });
  }

  ngOnInit() {
    this.commons.show();
    this.router.navigateByUrl(this.router.url.replace(this.route.snapshot.params.language,
      this.translation.getLang()));
    this.getAbout(this.langURL);
  }

  getAbout(lang) {
    this.isLoading = true;
    this.commons.getAboutPage(lang).subscribe(data => {
      console.log(data);
      this.isLoading = false;
      this.aboutContent = data;
    }, error => {
      console.log(error);
      this.isLoading = false;
    });
  }

}
