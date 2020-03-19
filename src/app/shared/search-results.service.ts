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

  GetSearchResults(result) {
    console.log(result)
    if (localStorage.getItem('current_lang') === 'en') {
      return this.http.get(environment.baseURL + '/wp-json/wp/v2/place?core&place_search=' + result + '&lang=en')
    }
    else {
      return this.http.get(environment.baseURL + '/wp-json/wp/v2/place?core&place_search=' + result)
    }
  }

  ngOnDestroy(){
    this._searchResultsRespond.unsubscribe();
  }
}
