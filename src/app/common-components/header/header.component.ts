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
  languageSwitcherStatus = true;

  constructor(
    public commons: CommonsService,
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

  }

  ngOnInit() {
    this.langURL = localStorage.getItem('current_lang');
    this.userProfileImage = localStorage.getItem('profile_image');
    this.userProfileImage = (this.sanitizer.bypassSecurityTrustUrl(this.userProfileImage));
    this.userProfileImage = this.userProfileImage.changingThisBreaksApplicationSecurity;
    // this.placeTypes(this.langURL);
    this.userData.currentProfilePicture.subscribe(picture => this.profilePicture = picture);
    this.getUserProfilePicture();
    this.translation.langUpdated.subscribe(
      (lang) => {
        console.log(lang);
        localStorage.setItem('current_lang', lang);
        this.langURL = lang;
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
