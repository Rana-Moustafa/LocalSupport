import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MapsService {

  constructor(private http: HttpClient) {}

  getCurrentLanguage() {
    return localStorage.getItem('current_lang');
  }
  getMapLocations() {

    const headers = new HttpHeaders({
      'Cache-Control': 'no-cache, no-store, must-revalidate, post- check=0, pre-check=0',
      'Access-Control-Allow-Headers': '*',
      'Access-Control-Allow-Origin': '*'
    });

    if (localStorage.getItem('current_lang') === 'de') {
      return this.http.get(environment.baseURL + '/wp-json/outdoorf/v1/map_search?skip_cache=1');
    } else {
      return this.http.get(environment.baseURL + '/wp-json/outdoorf/v1/map_search?skip_cache=1?lang='
      + this.getCurrentLanguage());
    }
  }
}