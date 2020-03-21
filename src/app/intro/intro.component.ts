import { Component, OnInit, ViewChild } from '@angular/core';
// import { OwlCarousel } from 'ngx-owl-carousel';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Location } from '@angular/common';
import { AutoHeightService } from 'ngx-owl-carousel-o/lib/services/autoheight.service';
import { CommonsService } from './../shared/commons.service';
import { Router, ActivationEnd } from '@angular/router';
import { TranslationService } from '../shared/translation.service';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss']
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
    nav: false,
    // autoWidth: true,
  }

  advertiseData;
  langURL = localStorage.getItem('current_lang');

  constructor(private commons: CommonsService,
              private router: Router,
              private translation: TranslationService,
              private location: Location,
              private translate: TranslateService) { 

                
              }

  ngOnInit() {
    if (!localStorage.getItem('current_lang')) {
      this.translate.use('de');
    } else if (localStorage.getItem('current_lang') && localStorage.getItem('current_lang') === 'en') {
      this.translate.use('en');
    } else if (localStorage.getItem('current_lang') && localStorage.getItem('current_lang') === 'de') {
      this.translate.use('de');
    }
    console.log(this.location.getState());
    this.commons.showPadding = false;
    this.advertiseData = this.location.getState();
    this.commons.hide();
    this.introItems();
    this.translation.addRouterLangParam();
    this.translation.langUpdated.subscribe(
      (lang) => {
        localStorage.setItem('current_lang', lang);
        // this.router.navigateByUrl(this.router.url.replace(this.route.snapshot.params.language,
        //   lang));
        this.introItems();
      }
    );
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
