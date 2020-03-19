import { Component, OnInit, OnDestroy, ViewEncapsulation, EventEmitter, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PlacesService } from '../../shared/places.service';
import { TranslationService } from '../../shared/translation.service';
import { CommonsService } from '../../shared/commons.service';
import { Subscription } from 'rxjs';
import { Location } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';



@Component({
  selector: 'app-places-category-list',
  templateUrl: './places-category-list.component.html',
  styleUrls: ['./places-category-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class PlacesCategoryListComponent implements OnInit {
  @Output() redirect: EventEmitter<any> = new EventEmitter();

  PlacesItemsDetails;
  test = []
  placescountLength = [];
  placesTypeData = [];
  placescount;
  customText = 'All';
  customIndex;
  found;
  placesTypeList;
  SortBy = 'All';
  showOrHideListItems;
  starRating = 0;
  sideNav = false;
  places = document.getElementsByClassName('places-results-item');
  placeType;
  dict;
  totalPlacesNumber;
  isLoading = false;
  placeTypeName;
  page = 0;
  perPage = 8;
  selectedPlaceId = 0;
  allPlaces = [];
  isFullListDisplayed = false;
  currentSelectedCategory;
  placeTypeId;
  sortText = this.translate.instant('Latest');
  notfound = true;
  navigatedCategoryId;
  placeFilterSelection = 'sort_latest';
  sortByNames = [
    { id: 1, name: this.translate.instant('sort_viewed'), sortBy: 'sort_viewed' },
    { id: 2, name: this.translate.instant('sort_favorited'), sortBy: 'sort_favorited' },
    { id: 3, name: this.translate.instant('sort_popular'), sortBy: 'sort_popular' }
  ];

  langURL = localStorage.getItem('current_lang')
  constructor(private placesService: PlacesService,
              private router: Router,
              private translation: TranslationService,
              private route: ActivatedRoute,
              private commons: CommonsService,
              private location: Location,
              private translate: TranslateService) {}

  data: any = { text: 'example' };
  changeComponent(url: string) {
    this.redirect.emit(this.data);
    this.router.navigate(['places-category']);
  }
  ngOnInit() {
    this.customText = 'All';
    this.placeTypeId = 0;
    this.navigatedCategoryId = this.location.getState();
     console.log(this.location.getState());
    // console.log(JSON.parse(JSON.stringify(this.navigatedCategoryId)).length);
    // console.log(this.navigatedCategoryId.id);
    if (this.location.getState() && this.navigatedCategoryId && this.navigatedCategoryId.name ) {
      this.navigatedCategoryId = this.location.getState();
      this.placeTypeId = this.navigatedCategoryId.id;
      // this.placesCategories(this.navigatedCategoryId.id);
      this.placesCategories();
      this.customText = this.navigatedCategoryId.name;
    } else {
      console.log('$$$$$$');
      console.log(this.customText)
      this.customText = 'All';
    }

    this.commons.showLoadingSpinner();
    this.router.navigateByUrl(this.router.url.replace(this.route.snapshot.params.language, localStorage.getItem('current_lang')));

    this.placesList();
    this.placesCategories();

    this.translation.addRouterLangParam();

    this.translation.langUpdated.subscribe(
      (lang) => {
        this.commons.showLoadingSpinner();
        this.dict = this.translation.getLang();
        this.allPlaces = [];
        this.isFullListDisplayed = false;
        this.page = 0;
        localStorage.setItem('current_lang', lang);
        this.router.navigateByUrl(this.router.url.replace(this.route.snapshot.params.language,
          localStorage.getItem('current_lang')));
        this.placesList();
        this.placesCategories();
        // this.changeCatDropdown();
        this.changeSortName(this.translate.instant('Latest'), 'sort_latest');

      }
    );

    this.found = true;
    this.showOrHideListItems = true;


  }

  toggleSideNav() {
    this.sideNav = !this.sideNav;
  }
  changePlaceType(name, id, index) {
    console.log(name);
    this.placeTypeId = id;
    this.customText = name;
    this.customIndex = index;
    console.log(this.customIndex);
    this.allPlaces = [];
    this.isFullListDisplayed = false;
    this.page = 0;
  }
  changeSortName(name, sortNAme) {
    this.sortText = name;
    this.placeFilterSelection = sortNAme;
  }
  switchPlace(value: string, id: number) {
    this.placescountLength = [];

    this.customText = value;
  }
  valueClickSortBy(value: string) {
    this.SortBy = value;
  }

  PlacesItems() {
    this.placesService.getPlacesItems().subscribe(data => {
      this.PlacesItemsDetails = data;
      this.placescount = this.PlacesItemsDetails.length;
    }, error => {
      console.log(error);
    });
  }

  placesList() {
    this.allPlaces = [];
    this.isFullListDisplayed = false;
    this.placesService.getPlacesTypes().subscribe(data => {
      this.commons.hideLoadingSpinner();
      this.placesTypeList = data;
      if (this.customIndex !== null && this.placesTypeList[this.customIndex]) {
        this.customText = this.placesTypeList[this.customIndex].name;
      }
      if (this.placesTypeList.find(x => x.id === this.placeTypeId)) {
        this.placesTypeList.find(x => x.name === this.customText);
      }
    }, error => {

      this.commons.hideLoadingSpinner();
    });
  }

  changePlaceCategoryId(placeTypeId) {
    this.selectedPlaceId = placeTypeId;
  }
  placesCategories() {
    console.log(this.placeFilterSelection);
    this.isLoading = true;

    this.page++;
    this.placesService.getPlacesCategories(this.placeTypeId, this.placeFilterSelection, this.page, this.perPage).subscribe(data => {
      console.log(this.allPlaces);
      this.isLoading = false;
      this.PlacesItemsDetails = JSON.parse(JSON.stringify(data));
      console.log(this.PlacesItemsDetails);
      this.totalPlacesNumber = this.PlacesItemsDetails.length > 0 ? this.PlacesItemsDetails[0].total_places : '0';
      for (var i = 0; i < this.PlacesItemsDetails.length; i++) {
        this.allPlaces.push(this.PlacesItemsDetails[i]);
      }
      if (this.PlacesItemsDetails && this.PlacesItemsDetails.length === 0) {
        console.log('no comments')
        this.isFullListDisplayed = true;
        // this.loadingComments = false;
      }


    }, error => {
      console.log(error);
      if (error.status === 400) {
        this.isFullListDisplayed = true;
      }
      this.isLoading = false;
      this.isFullListDisplayed = true;
    });
  }

  getAllPlaces() {
    this.isLoading = true;
    this.totalPlacesNumber = 0;
    this.placeTypeName = 'All';
    this.placesService.getPlacesItems().subscribe(data => {
      this.isLoading = false;
      this.PlacesItemsDetails = JSON.parse(JSON.stringify(data));
      this.totalPlacesNumber = this.PlacesItemsDetails.length > 0 ? this.PlacesItemsDetails[0].total_places : '0';

    }, error => {
      console.log(error);
      this.isLoading = false;
    });
  }
  emptyPlace() {
    this.page = 0;
    this.allPlaces = [];
    this.PlacesItemsDetails = [];
  }
  placesSort(sort) {
    console.log(this.selectedPlaceId);
    this.page = 0;
    // this.allPlaces = [];
    this.placesCategories();
    console.log(this.PlacesItemsDetails);
  }
  placesEventHandling(places) {
    if (places.length !== 0) {
      console.log(places);
      console.log('found');
      this.allPlaces = places;
      this.notfound = false;

    } else {
      console.log('notfound');
      this.PlacesItemsDetails = [];
      this.notfound = true;
      this.allPlaces = this.PlacesItemsDetails;
    }
  }
}
