import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SearchResultsService implements OnDestroy {

  public _searchResultsRespond = new Subject<any>();

  public getSearchResultSubject(message) {
    this._searchResultsRespond.next(message);
    // return this._searchResultsRespond;
  }

  constructor(private http: HttpClient) { }

  getCurrentLanguage() {
    return localStorage.getItem('current_lang');
  }

  GetSearchResults(result, page, perpage, lang) {

    const headers = new HttpHeaders({
      'Cache-Control': 'no-cache, no-store, must-revalidate, post- check=0, pre-check=0',
      'Access-Control-Allow-Headers': '*',
      'Access-Control-Allow-Origin': '*'
    });

    console.log(result);

    if (localStorage.getItem('current_lang') === 'de'){
      return this.http.get(environment.baseURL + '/wp-json/wp/v2/place?core&skip_cache=1&place_search=' +
      (result.length > 0 ? result : '') + '&page=' +
       page + '&per_page=' + perpage);
    } else {
      return this.http.get(environment.baseURL + '/wp-json/wp/v2/place?core&skip_cache=1&place_search=' +
      (result.length > 0 ? result : '') + '&page=' +
       page + '&per_page=' + perpage + '&lang=' + this.getCurrentLanguage());
    }
  }

  ngOnDestroy() {
    this._searchResultsRespond.unsubscribe();
  }
}