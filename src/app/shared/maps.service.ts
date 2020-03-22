import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MapsService {

  constructor(private http: HttpClient) { }

  getMapLocations() {
    if ( localStorage.getItem('current_lang') === 'en') {
      return this.http.get(environment.baseURL + '/wp-json/outdoorf/v1/map_search?lang=en&skip_cache=1' );
    } else {
      return this.http.get(environment.baseURL + '/wp-json/outdoorf/v1/map_search?skip_cache=1');
    }
  }
}
