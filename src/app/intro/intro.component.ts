import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
// import { OwlCarousel } from 'ngx-owl-carousel';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Location } from '@angular/common';
import { AutoHeightService } from 'ngx-owl-carousel-o/lib/services/autoheight.service';
import { CommonsService } from './../shared/commons.service';
import { Router, ActivationEnd, NavigationEnd, ActivatedRoute } from '@angular/router';
import { TranslationService } from '../shared/translation.service';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class IntroComponent implements OnInit {

  // @ViewChild('owlElement', { static: true }) owlElement: OwlCarousel;
  introItemsNames;
  introCount = 0;
  arrow;
  intro = false;

  IntroSlider: OwlOptions = {
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    autoplay: false,
    navSpeed: 700,
    items: 1,
    rewind: false,
    nav: false
  };
  selectedLang;
  languages = [
    {
      fullName: 'English',
      lang: 'en'
    },
    {
      fullName: 'Deutsch',
      lang: 'de'
    },
    {
      fullName: 'Francais',
      lang: 'fr'
    },
    {
      fullName: 'Italiano',
      lang: 'it'
    },
    {
      fullName: 'Rumantsch',
      lang: 'rm'
    }
  ];
  advertiseData;
  langURL = localStorage.getItem('current_lang');

  constructor(
    private commons: CommonsService,
    private router: Router,
    private route: ActivatedRoute,
    private translation: TranslationService,
    private location: Location,
    private translate: TranslateService) {
  }

  ngOnInit() {
    this.router.navigateByUrl(this.router.url.replace(this.route.snapshot.params.language,
      localStorage.getItem('current_lang')));
    console.log(this.translate.currentLang);
    console.log(this.location.getState());
    this.commons.showPadding = false;
    this.advertiseData = this.location.getState();
    this.commons.hide();
    this.introItems();
    this.translation.addRouterLangParam();
    this.translation.langUpdated.subscribe(
      (lang) => {
        localStorage.setItem('current_lang', lang);
        this.router.navigateByUrl(this.router.url.replace(this.route.snapshot.params.language,
          lang));
        this.introItems();
      }
    );
  }
  getSelectedLang(lang) {
    console.log(lang);
    this.selectedLang = lang;
    this.translation.addTranslationLanguage(lang);

  }
  introItems() {

    console.log(this.introItemsNames);
    this.commons.getIntroData().subscribe(data => {
      this.introItemsNames = data;
      console.log(this.introItemsNames);
    }, error => {
      console.log(error);
    });

  }

  hideIntro() {
    this.intro = true;
    this.commons.show();
    this.commons.showPadding = true;
  }
}
