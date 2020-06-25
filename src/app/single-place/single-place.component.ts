import { Component, OnInit, HostListener, ViewEncapsulation, OnDestroy } from '@angular/core';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { PlacesService } from '../shared/places.service';
import { TranslationService } from '../shared/translation.service';
import { UserStatusService } from '../shared/user-status.service';
import { CommonsService } from '../shared/commons.service';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';

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
  singlePlaceImages;

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
    this.checkWindowWidth();
  }

  trigger() {
    window.dispatchEvent(new Event('resize'));
  }
  constructor(
    private places: PlacesService,
    private route: ActivatedRoute,
    private router: Router,
    private translation: TranslationService,
    public userStatus: UserStatusService,
    public commons: CommonsService,
    private translate: TranslateService) {
    this.innerWidth = window.innerWidth;

    this.checkWindowWidth();
    this.places.getCurrentLocation();
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.router.navigateByUrl(this.router.url.replace(this.route.snapshot.params.language,
        event.lang)).then(() => {
          this.commons.showLoadingSpinner();
          this.getSinglePlace(this.route.snapshot.params['id']);
          this.placeNotTranslated = false;
        });
    });
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
    // this.oldLanguage = this.route.snapshot.params.language;
    // this.places.getCurrentLocation();
    // this.translation.addRouterLangParam();
    this.getSinglePlace(this.route.snapshot.params['id']);
  }

  addToFav(id) {
    this.places.addToFavPlaces(id).subscribe(data => {
      // console.log(data);
    }, error => {
      console.log(error);
    });
  }


  getSinglePlace(placeid) {
    this.router.url.replace(this.route.snapshot.params.language, localStorage.getItem('current_lang'));
    this.places.getSinglePlaceData(placeid).subscribe(data => {
      this.router.navigateByUrl(this.router.url.replace(this.route.snapshot.params.language, localStorage.getItem('current_lang')));

      this.singlePlaceData = data;
      this.commons.hideLoadingSpinner();
      if (this.singlePlaceData.images.length === 0) {
        this.singlePlaceData.images.push(this.singlePlaceData.featured_image);
      }
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
