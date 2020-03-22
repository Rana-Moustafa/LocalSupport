import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SearchResultsService implements OnDestroy {

  public _searchResultsRespond= new Subject<any>();

  public getSearchResultSubject(message) {
    this._searchResultsRespond.next(message);
   // return this._searchResultsRespond;
  }

  constructor(private http: HttpClient) { }

  GetSearchResults(result, page, perpage, lang) {
    console.log(result);
    if (lang === 'en') {
      return this.http.get(environment.baseURL + '/wp-json/wp/v2/place?core&place_search=' + result + '&lang=en&page=' +
      page + '&per_page=' + perpage);
    } else if (lang === 'de') {
      console.log(environment.baseURL + '/wp-json/wp/v2/place?core&place_search=' + (result.length > 0 ? result : '') + '&page=' +
      page + '&per_page=' + perpage);
      return this.http.get(environment.baseURL + '/wp-json/wp/v2/place?core&place_search=' + (result.length > 0 ? result : '') + '&page=' +
      page + '&per_page=' + perpage);
    }
  }

  ngOnDestroy(){
    this._searchResultsRespond.unsubscribe();
  }
}
