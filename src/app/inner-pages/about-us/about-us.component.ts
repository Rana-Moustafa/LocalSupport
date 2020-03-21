import { Component, OnInit } from '@angular/core';
import { CommonsService } from 'src/app/shared/commons.service';
import { TranslateService } from '@ngx-translate/core';
import { TranslationService } from '../../shared/translation.service';
@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit {
  aboutContent;
  langURL = localStorage.getItem('current_lang');

  constructor(private commons: CommonsService,
              public translate: TranslateService,
              private translation: TranslationService) { }

  ngOnInit() {
    this.getAbout(this.langURL);


    this.translation.langUpdated.subscribe(
      (lang) => {
        localStorage.setItem('current_lang', lang);
        console.log(lang);
        this.translate.use(lang);
        this.getAbout(lang);
      }
    );
  }

  getAbout(lang) {
    this.commons.getAboutPage(lang).subscribe( data => {
      console.log(data);
      this.aboutContent = data;
    }, error => {
      console.log(error);
    });
  }

}
