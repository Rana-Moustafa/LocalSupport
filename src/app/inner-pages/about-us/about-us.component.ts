import { Component, OnInit } from '@angular/core';
import { CommonsService } from 'src/app/shared/commons.service';
import { TranslateService } from '@ngx-translate/core';
import { TranslationService } from '../../shared/translation.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit {
  aboutContent;
  langURL = localStorage.getItem('current_lang');

  constructor(
    private commons: CommonsService,
    public translate: TranslateService,
    private translation: TranslationService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.getAbout(this.langURL);
    // this.router.navigateByUrl(this.router.url.replace(this.route.snapshot.params.language,
    //   this.langURL));

    this.translation.langUpdated.subscribe(
      (lang) => {
        localStorage.setItem('current_lang', lang);
        console.log(lang);
        // this.translate.use(lang);
        console.log(this.route.snapshot.params.language);
        this.getAbout(lang);
      }
    );
  }

  getAbout(lang) {
    this.commons.getAboutPage(lang).subscribe(data => {
      console.log(data);
      this.aboutContent = data;
    }, error => {
      console.log(error);
    });
  }

}
