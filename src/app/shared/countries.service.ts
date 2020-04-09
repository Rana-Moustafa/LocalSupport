import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { Observable } from 'rxjs/Observable';
import countries from './countries.json';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {
  
  countriesData = countries

  constructor(private http: HttpClient) {
    // this.getJSON().subscribe(data => {
    //   ////// (data);
    // });
   }
  // public getJSON(): Observable<any> {
  //   return this.http.get("./countries.json");
  // }
}
