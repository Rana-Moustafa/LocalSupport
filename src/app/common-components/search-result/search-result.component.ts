import { Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SearchResultsService } from '../../shared/search-results.service';


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

  constructor(public searchResultsService: SearchResultsService,
              private route: ActivatedRoute) { }
  result;
  searchResults;
  results;
  searchWord;

  ngOnInit() {
    // this.searchResult();
    this.searchResultsService._searchResultsRespond.subscribe(message => {
      this.searchWord = message;
      this.searchQuery(this.searchWord);
      // console.log(this.searchWord);
    });
    console.log(this.route.snapshot.queryParamMap.get('search'));
    this.searchWord = this.route.snapshot.queryParamMap.get('search');
    this.searchQuery(JSON.parse(this.route.snapshot.queryParamMap.get('search')));
    // this.searchResults = this.route.snapshot.queryParamMap.get('search')
  }
  searchQuery(search) {
    this.searchResultsService.GetSearchResults(search).subscribe(data => {
      console.log(data);
      this.results = data;
      if (this.results.length === 0) {
        this.notfound = true;
      } else {
        this.notfound = false;
      }
     // this.SearchResultsService.getSearchResultSubject().next(data)
    }, error => {
      console.log(error);
    });
  }
}
