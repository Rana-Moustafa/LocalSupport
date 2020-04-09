import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot,
Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';

import { PlacesService } from '../shared/places.service';

@Injectable({
  providedIn: 'root'
})
export class LocationResloverService implements Resolve<any> {

  constructor(private places: PlacesService,
    private router: Router,
    private route: ActivatedRoute) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    ////// ('resolver')
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
       
        ////// (position.coords.latitude + '' + position.coords.longitude)
        return position.coords.latitude;
      });
    }

    
  }
}