import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders  } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  constructor(private http: HttpClient, private router: Router) {
  }


  filterPlaces() {
    // let registerationFormData: FormData = new FormData();
    // registerationFormData.append('name', userData.username);
    // registerationFormData.append('email', userData.email);
    // registerationFormData.append('address', userData.address);
    // registerationFormData.append('country', userData.country);
    // registerationFormData.append('city', userData.city);
    // registerationFormData.append('password', userData.password);
    // registerationFormData.append('confirm_password', userData.confirmpassword);
    // return this.http.post('https://sta-odf.hosting.modeso.ch/wordpress/wp-json/wp/v2/place?core&size=medium&accessible_by=bus&accessibility=Wheel Chair&food=Restaurants&features[0]=Sand&activities=Hiking&rating_filter=4&distance=5&place_type=5')
  }
}
