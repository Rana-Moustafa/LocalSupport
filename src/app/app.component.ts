import { Component, OnInit, EventEmitter, Output, NgModule, ViewChild } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute, RoutesRecognized, ParamMap } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CookieLawModule } from 'angular2-cookie-law';
import { TranslateService } from '@ngx-translate/core';
import { Observable, Observer, fromEvent, merge } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { PlacesService } from './shared/places.service';
import { TranslationService } from './shared/translation.service';
import { CommonsService } from './shared/commons.service';
import { AuthenticationService } from './shared/auth.service';
import { MapsService } from './shared/maps.service';

declare var gtag;

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

  constructor(
    public commons: CommonsService,
    private places: PlacesService,
    private authenticationService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute,
    public translate: TranslateService,
    private translation: TranslationService,
    private mapService: MapsService) {

    translate.addLangs(['de', 'en', 'fr', 'it', 'rm']);
    const browserLang = translate.getBrowserLang();
    console.log(browserLang);
    translate.use(browserLang.match(/de|en|fr|it|rm/) ? browserLang : 'de');
    localStorage.setItem('current_lang', browserLang);
    
    // this.router.url.replace(this.route.snapshot.params.language,
    //   localStorage.getItem('current_lang'));
    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang(translate.getBrowserLang());
    if (!localStorage.getItem('current_lang')) {
      this.translation.addTranslationLanguage(browserLang);
      // this.translation.addTranslationLanguage(this.translate.defaultLang);
      this.translate.use(browserLang);
      localStorage.setItem('current_lang', browserLang);
      this.router.url.replace(this.route.snapshot.params.language,
        localStorage.getItem('current_lang'));
    } 
    // else if (localStorage.getItem('current_lang') && localStorage.getItem('current_lang') === 'en') {
    //   this.translate.use('en');
    //   localStorage.setItem('current_lang', 'en');
    //   this.router.url.replace(this.route.snapshot.params.language,
    //     localStorage.getItem('current_lang'));
    // } else if (localStorage.getItem('current_lang') && localStorage.getItem('current_lang') === 'fr') {
    //   this.translate.use('fr');
    //   localStorage.setItem('current_lang', 'fr');
    //   this.router.url.replace(this.route.snapshot.params.language,
    //     localStorage.getItem('current_lang'));
    // } else if (localStorage.getItem('current_lang') && localStorage.getItem('current_lang') === 'it') {
    //   this.translate.use('it');
    //   localStorage.setItem('current_lang', 'it');
    //   this.router.url.replace(this.route.snapshot.params.language,
    //     localStorage.getItem('current_lang'));
    // } else if (localStorage.getItem('current_lang') && localStorage.getItem('current_lang') === 'rm') {
    //   this.translate.use('rm');
    //   localStorage.setItem('current_lang', 'rm');
    //   this.router.url.replace(this.route.snapshot.params.language,
    //     localStorage.getItem('current_lang'));
    // }
    // the lang to use, if the lang isn't available, it will use the current loader to get them
    // translate.use(translate.getBrowserLang());
    // console.log(this.langURL);
    // translate.addLangs(['de', 'en']);
    // translate.setDefaultLang('de');


    // Connect to Google Analytics
    const navEndEvents = router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    );

    navEndEvents.subscribe((event: NavigationEnd) => {
      gtag('config', 'UA-161700458-1', {
        'page_path': event.urlAfterRedirects
      });
    });

  }
  ngOnInit() {
    // this.translation.useLanguage(localStorage.getItem('current_lang'));
    // localStorage.setItem('current_lang', 'de');

    // this.commons.showTranslation();
    // this.commons.sendLanguageSwitcherStatus(false);
    // this.commons.changeLanguageSwitcherStatus(false);
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

}
