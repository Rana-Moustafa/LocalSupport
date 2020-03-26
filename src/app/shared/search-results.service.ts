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


  GetSearchResults(result, page, perpage, lang) {

    const headers = new HttpHeaders({
      'Cache-Control': 'no-cache, no-store, must-revalidate, post- check=0, pre-check=0',
      'Access-Control-Allow-Headers': '*',
      'Access-Control-Allow-Origin': '*'
    });

    console.log(result);
    if (lang === 'en') {
      return this.http.get(environment.baseURL + '/wp-json/wp/v2/place?core&skip_cache=1&place_search=' +
      (result.length > 0 ? result : '') + '&lang=en&page=' +
        page + '&per_page=' + perpage,
        {headers} );
    } else if (lang === 'de') {
      return this.http.get(environment.baseURL + '/wp-json/wp/v2/place?core&skip_cache=1&place_search=' +
       (result.length > 0 ? result : '') + '&page=' +
        page + '&per_page=' + perpage,
        {headers});
    }
  }

  ngOnDestroy() {
    this._searchResultsRespond.unsubscribe();
  }
}
