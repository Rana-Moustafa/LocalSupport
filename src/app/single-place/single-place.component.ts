import { Component, OnInit, HostListener, ViewEncapsulation, OnDestroy } from '@angular/core';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { PlacesService } from '../shared/places.service';
import { TranslationService } from '../shared/translation.service';
import { UserStatusService } from '../shared/user-status.service';
import { CommonsService } from '../shared/commons.service';

@Component({
  selector: 'app-single-place',
  templateUrl: './single-place.component.html',
  styleUrls: ['./single-place.component.scss'],
  encapsulation: ViewEncapsulation.None
})
@HostListener('window:resize', ['$event'])
export class SinglePlaceComponent implements OnInit, OnDestroy {

  innerWidth;
  singlePlaceData;
  showDetailsDesktop = true;
  singlePlaceParent;
  latitude: number;
  longitude: number;
  zoom: number;
  eventId;
  location;
  translatedId;
  placeNotTranslated;
  oldLanguage;

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
    this.checkWindowWidth();
  }

  trigger() {
    window.dispatchEvent(new Event('resize'));
  }
  constructor(private places: PlacesService,
              private route: ActivatedRoute,
              private router: Router,
              private translation: TranslationService,
              public userStatus: UserStatusService,
              public commons: CommonsService) {
              this.innerWidth = window.innerWidth;

              this.checkWindowWidth();


  }
  checkWindowWidth() {
    this.innerWidth = window.innerWidth;
    if (this.innerWidth <= 991) {
      this.showDetailsDesktop = false;
    } else if (this.innerWidth >= 991) {
      this.showDetailsDesktop = true;
    }
  }
  ngOnInit() {
    this.commons.darkHeader = false;
    this.commons.showLoadingSpinner();
    this.oldLanguage = this.route.snapshot.params.language;
    this.router.navigateByUrl(this.router.url.replace(this.route.snapshot.params.language, localStorage.getItem('current_lang')));

    this.places.getCurrentLocation();
    this.translation.addRouterLangParam();
    this.getSinglePlace(this.route.snapshot.params['id']);
   
    this.translation.langUpdated.subscribe(
      (lang) => {
        this.commons.showLoadingSpinner();
        const currentLang = localStorage.getItem('current_lang');
        const translatedLang = lang;
        let u = this.router.url;
        if (this.translatedId) {
          u = u.replace(currentLang, lang);
          u = u.replace(this.route.snapshot.params.id.toString(), this.translatedId.toString());
          console.log(u);
          this.router.navigateByUrl(u);
          this.getSinglePlace(this.translatedId);
          this.placeNotTranslated = false;
        } else {
          //console.log('nooooooooooo translation');
          u = u.replace(currentLang, this.oldLanguage);
          // u = u.replace(this.route.snapshot.params.id.toString(), this.id.toString());
          console.log(u);
          this.router.navigateByUrl(u);
          localStorage.removeItem('current_lang');
          localStorage.setItem('current_lang', this.oldLanguage);
          this.placeNotTranslated = true;
        }
      }
    );

  }

  addToFav(id) {
    this.places.addToFavPlaces(id).subscribe(data => {
      console.log(data);
    }, error => {
      console.log(error);
    });
  }


  getSinglePlace(placeid) {
    this.places.getSinglePlaceData(placeid).subscribe(data => {

      this.singlePlaceData = data;
      this.commons.hideLoadingSpinner();
      console.log('singlePlaceData');
      console.log(this.singlePlaceData);

      this.translatedId = this.singlePlaceData.translated_id;
      this.singlePlaceParent = this.singlePlaceData;
      // console.log(this.translatedId)
      if (!this.translatedId) {
        // this.commons.sendLanguageSwitcherStatus(true);
        this.commons.changeLanguageSwitcherStatus(true);
      } else {
        // this.commons.sendLanguageSwitcherStatus(false);
        this.commons.changeLanguageSwitcherStatus(false);
      }

    }, error => {
      // console.log(error)
      this.commons.hideLoadingSpinner();
    });
  }
  getTranslatedSinglePlace(id) {
    this.places.getSinglePlaceData(id).subscribe(data => {
      this.singlePlaceData = data;
      this.singlePlaceParent = this.singlePlaceData;
      this.route.params.subscribe(params => {
        params = id;
      });
    }, error => {
      // console.log(error)
    });
  }

  ngOnDestroy() {
    this.commons.changeLanguageSwitcherStatus(false);
  }
}
