import { Component, OnInit, ViewChild } from '@angular/core';
// import { OwlCarousel } from 'ngx-owl-carousel';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Location } from '@angular/common';
import { AutoHeightService } from 'ngx-owl-carousel-o/lib/services/autoheight.service';
import { CommonsService } from './../shared/commons.service';
import { Router } from '@angular/router';
import { TranslationService } from '../shared/translation.service';



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
              private location: Location) { }

  ngOnInit() {
    console.log(this.location.getState());
    this.advertiseData = this.location.getState();
    this.commons.hide();
    this.introItems();
    this.translation.addRouterLangParam();
    this.translation.langUpdated.subscribe(
      (lang) => {
        this.introItems();
      }
    );
  }

  introItems() {

    console.log(this.introItemsNames);

    if (this.advertiseData.length > 0) {
      // this.introItemsNames = this.location.getState();
      this.introItemsNames = this.advertiseData.intro;
    } else {
      this.commons.getIntroData().subscribe(data => {
        this.introItemsNames = data;
      }, error => {
        console.log(error);
      });
    }

  }
}
