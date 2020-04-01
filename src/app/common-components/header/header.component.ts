import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { CommonsService } from '../../shared/commons.service';
import { AuthenticationService } from '../../shared/auth.service';
import { UserStatusService } from '../../shared/user-status.service';
import { SearchResultsService } from '../../shared/search-results.service';

import { PlacesService } from '../../shared/places.service';
import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { TranslationService } from '../../shared/translation.service';
import { Location } from '@angular/common';
import { UserDataService } from '../../shared/user-data.service';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  // @ViewChild('resultForm', { static: true }) resultForm: NgForm;

  private userSub: Subscription;
  isAuthenticated = false;
  sideNav = false;
  mobileSearch = false;
  menuItemsNames;
  userProfileImage;
  selectedLang;
  searchText;
  profilePicture = '../../../assets/images/user-placeholder.png';
  langURL = localStorage.getItem('current_lang');
  currentPicture = JSON.stringify(localStorage.getItem('profile_image'));
  categoriesNames;
  languageSwitcherStatus = false;

  constructor(public commons: CommonsService,
    private authenticationService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute,
    public userStatus: UserStatusService,
    public translate: TranslateService,
    private translation: TranslationService,
    private location: Location,
    public userData: UserDataService,
    public searchResultsService: SearchResultsService,
    public sanitizer: DomSanitizer,
    private places: PlacesService) {

    console.log('header');
    // translate.addLangs(['de', 'en']);
    // translate.setDefaultLang('de');
    // localStorage.setItem('current_lang', 'de');
    // translate.use('de');
  }

  ngOnInit() {
    this.langURL = localStorage.getItem('current_lang');
    // this.commons.showTranslation();
    // this.languageSwitcherStatus = this.commons.getLanguageSwitcherStatus();
    // this.commons.languageSwitcherStatus.subscribe( status => {
    //   // console.log(status);
    //   this.languageSwitcherStatus = status;
    // });
    this.userProfileImage = localStorage.getItem('profile_image');
    this.userProfileImage = (this.sanitizer.bypassSecurityTrustUrl(this.userProfileImage));
    this.userProfileImage = this.userProfileImage.changingThisBreaksApplicationSecurity;
    // this.placeTypes(this.langURL);
    this.userData.currentProfilePicture.subscribe(picture => this.profilePicture = picture);
    this.getUserProfilePicture();
    // this.translate.use(this.langURL);
    // if (!localStorage.getItem('current_lang')) {
    //   this.translation.addTranslationLanguage('de');
    //   this.translation.addTranslationLanguage(this.translate.defaultLang);
    //   this.translate.use('de');
    //   this.router.url.replace(this.route.snapshot.params.language, this.translate.defaultLang);
    //   // this.placeTypes(this.langURL);
    // } else if (localStorage.getItem('current_lang') && localStorage.getItem('current_lang') === 'en') {
    //   this.router.url.replace(this.route.snapshot.params.language, 'en');
    //   this.translate.use('de');
    //   // this.placeTypes(this.langURL);
    // } else if (localStorage.getItem('current_lang') && localStorage.getItem('current_lang') === 'de') {
    //   this.router.url.replace(this.route.snapshot.params.language, 'de');
    //   this.translate.use('de');
    //   // this.placeTypes(this.langURL);
    // }


    this.translation.langUpdated.subscribe(
      (lang) => {
        console.log(lang);
        // this.toggleSideNav();
        // this.router.url.replace(this.route.snapshot.params.language, lang);
        this.translation.useLanguage(lang);
        // this.translate.use(lang);
        // this.placeTypes(lang);
        this.langURL = lang;
        this.router.events.filter(e => e instanceof NavigationEnd).subscribe(e => {
        });
      }
    );
  }
  getSelectedLang(lang) {

    this.selectedLang = lang;
    this.translation.addTranslationLanguage(lang);

  }
  toggleSideNav() {
    this.sideNav = !this.sideNav;
  }
  toggleSearch() {
    this.mobileSearch = !this.mobileSearch;
  }

  Logout() {
    this.authenticationService.userLogout();
  }
  menuItems() {
    this.commons.getMenuItems().subscribe(data => {
      // console.log(data)
      this.menuItemsNames = data;
    }, error => {
      // console.log(error)
    });
  }
  searchResult(resultForm: NgForm) {
    this.searchResultsService.getSearchResultSubject(resultForm.value.search);
    console.log(resultForm.value.search);
    this.router.navigate(['/' + this.langURL + '/search-result'], { queryParams: { search: JSON.stringify(resultForm.value.search) } });
    if (this.mobileSearch) {
      this.toggleSearch();
    }
    // resultForm.reset();
  }

  getUserProfilePicture() {
    this.userData.getUserDetails().subscribe(data => {
      this.profilePicture = JSON.parse(JSON.stringify(data)).profile_image;
    }, error => {
      console.error(error);
    });
  }

  sendSelectedCategory(cateId, catName) {
    this.router.navigateByUrl('/' + this.langURL + '/places-category', { state: { id: cateId, name: catName } });
  }

  placeTypes(lang) {
    this.places.getPlacesTypess(lang).subscribe(data => {
      this.categoriesNames = JSON.parse(JSON.stringify(data));
    }, error => {
      // console.log(error)
    });
  }

}
