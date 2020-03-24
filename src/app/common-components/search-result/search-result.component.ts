import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SearchResultsService } from '../../shared/search-results.service';
import { PlacesService } from 'src/app/shared/places.service';
import { TranslateService } from '@ngx-translate/core';
import { TranslationService } from '../../shared/translation.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit {
  seachResults: any[] = [];

  PlacesItemsDetails;
  test = [];
  placescountLength = [];
  placesTypeData = [];
  placescount;
  found;
  placesTypeList;
  showOrHideListItems;
  starRating = 0;
  places = document.getElementsByClassName('places-results-item');
  placeType;
  dict;
  notfound = false;
  langURL = localStorage.getItem('current_lang');
  sideNav = false;
  constructor(public searchResultsService: SearchResultsService,
              private route: ActivatedRoute,
              private placesService: PlacesService,
              public translate: TranslateService,
              private translation: TranslationService) { }
  result;
  searchResults;
  results;
  searchWord;
  page = 0;
  perPage = 8;
  placesResults;
  allPlaces = [];
  allSearchPlaces = [];
  isFullListDisplayed = false;
  filterComponent;
  isLoading = false;

  ngOnInit() {
    this.isLoading = false;
    // this.searchResult();
    this.searchResultsService._searchResultsRespond.subscribe(message => {
      this.searchWord = JSON.parse(message);
      this.searchQuery(this.searchWord, localStorage.getItem('current_lang'));
      console.log(this.searchWord);
    });
    console.log(this.route.snapshot.queryParamMap.get('search'));
    this.searchWord = JSON.parse(this.route.snapshot.queryParamMap.get('search'));
    this.searchQuery(JSON.parse(this.route.snapshot.queryParamMap.get('search')), localStorage.getItem('current_lang'));
    // this.searchResults = this.route.snapshot.queryParamMap.get('search');

    this.translation.langUpdated.subscribe(
      (lang) => {
        this.page = 0;
        this.allPlaces = [];
        this.allSearchPlaces = [];
        localStorage.setItem('current_land', lang);
        this.isLoading = true;
        console.log(lang);
        // this.toggleSideNav();
        this.translate.use(lang);
        this.searchQuery(JSON.parse(this.route.snapshot.queryParamMap.get('search')), lang);
      }
    );
  }

  toggleSideNav() {
    this.sideNav = !this.sideNav;
  }
  sendFilterPlaces(event) {
    this.page = 0;
    this.filterComponent = event;
    this.allPlaces = [];
    this.allSearchPlaces = [];
    this.isFullListDisplayed = false;
    this.getFilterPlaces();
  }
  getFilterPlaces() {
    this.isLoading = true;
    this.page++;
    this.placesService.filteredPlaces(this.filterComponent, this.page, this.perPage).subscribe(data => {
      console.log('filtered places');
      console.log(data);
      this.isLoading = false;
      this.sideNav = false;
      this.placesResults = JSON.parse(JSON.stringify(data));
      for (var i = 0; i < this.placesResults.length; i++) {
        this.allPlaces.push(this.placesResults[i]);
      }
      if ((this.placesResults && this.placesResults.length === 0) || !this.placesResults) {
        console.log('no comments');
        this.isFullListDisplayed = true;
        // this.loadingComments = false;
      }
      if ( this.allPlaces.length === 0){
        this.notfound = true;
      } else {
        this.notfound = false;
      }
    }, (errorMessage) => {
      console.log(errorMessage);
      this.isLoading = false;
      this.isFullListDisplayed = true;
      if (errorMessage.status === 400 ) {
        this.isFullListDisplayed = true;
      }
    });
  }
  searchQuery(search, lang) {
    this.isLoading = true;
    this.page++;
    this.searchResultsService.GetSearchResults(search, this.page, this.perPage, lang).subscribe(data => {
      console.log(data);
      this.isLoading = false;
      this.results = data;
      for (var i = 0; i < this.results.length; i++) {
        this.allSearchPlaces.push(this.results[i]);
      }
      if ((this.results && this.results.length === 0) || !this.results) {
        this.isFullListDisplayed = true;
        // this.loadingComments = false;
      }
      if (this.allSearchPlaces.length === 0) {
        this.notfound = true;
      } else {
        this.notfound = false;
      }
      // this.SearchResultsService.getSearchResultSubject().next(data)
    }, error => {
      console.log(error);
      this.isLoading = false;
    });
  }
}
