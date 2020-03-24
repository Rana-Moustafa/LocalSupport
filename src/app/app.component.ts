import { Component, OnInit, EventEmitter, Output, NgModule, ViewChild } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute, RoutesRecognized, ParamMap } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CookieLawModule } from 'angular2-cookie-law';
import { TranslateService } from '@ngx-translate/core';
import { Observable, Observer, fromEvent, merge } from 'rxjs';
import { map } from 'rxjs/operators';
import { PlacesService } from './shared/places.service';
import { TranslationService } from './shared/translation.service';
import { CommonsService } from './shared/commons.service';
import { AuthenticationService } from './shared/auth.service';
import { MapsService } from './shared/maps.service';


@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CookieLawModule,
  ]
})
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  minLength = 0;
  innerHeader;
  title = 'outdoor-family-frontend';
  latitude: number;
  longitude: number;
  zoom: number;
  coockiesDetails;
  getLangs;
  languageSelected;
  internetConnectionStatus;
  newUrl;
  @ViewChild('cookieLaw', { static: false })
  private cookieLawEl: any;

  selectedLang;
  scrollId;
  langURL = localStorage.getItem('current_lang');
  categoriesNames;
  hideRouter = false;

  @Output() userCurrentLocationLat: EventEmitter<any> = new EventEmitter();

  constructor(public commons: CommonsService,
              private places: PlacesService,
              private authenticationService: AuthenticationService,
              private router: Router,
              private route: ActivatedRoute,
              public translate: TranslateService,
              private translation: TranslationService,
              private mapService: MapsService) {

                translate.use('de');
    // translate.addLangs(['de', 'en']);
    // translate.setDefaultLang('de');

    // const browserLang = translate.getBrowserLang();
    // translate.use(browserLang.match(/de|en/) ? browserLang : 'en');

  }
  ngOnInit() {
    this.mapService.getMapLocations().subscribe( data => {
      console.log(data);
    }, error => {
      console.log(error);
    });
    // this.commons.showTranslation();
    // this.commons.sendLanguageSwitcherStatus(false);
    this.commons.changeLanguageSwitcherStatus(false);
    // this.placeTypes();
    if (!localStorage.getItem('current_lang')) {
      this.langURL = 'de';
    }

    this.authenticationService.autoLogin();
    window.addEventListener('scroll', this.scroll, true); // third parameter
    // this.Coockietext();

  }

  public dismiss(): void {
    this.cookieLawEl.dismiss();
  }

  onActivate(event) {
    window.scroll(0, 0);
  }

  Coockietext() {
    this.commons.getCookiesDetails().subscribe(data => {
      this.coockiesDetails = data;
    }, error => {
      // console.log(error)
    });
  }

  scroll = (event: any): void => {

    this.minLength = document.documentElement.scrollTop;
  }

  introItems() {
    this.commons.getIntroData().subscribe(data => {
        if (localStorage.getItem('active_advertising') !== 'true') {
          localStorage.setItem('active_advertising', 'true');
          this.router.navigateByUrl('/' + this.langURL + '/intro', { state: { intro: data } });
        }
    }, error => {
      this.hideRouter = true;
      console.log(error);

    });
  }

}
