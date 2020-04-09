import { Component, OnInit, Input } from '@angular/core';
import { PlacesService } from '../../shared/places.service';
// import { faCoffee, faStarHalfAlt, faStar } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  @Input() singlePlaceDetails;
  singlePlaceWebsite;
  singlePlaceName;
  // faCoffee = faCoffee;
  // faStarHalfAlt = faStarHalfAlt;
  // faStar = faStar;
  starRating = 0;
  placeMap;
  placeLat;
  placeLng;
  currentLatitude;
  currentLongitude;
  distance;
  langURL = localStorage.getItem('current_lang');
  constructor(private places: PlacesService) {}

  ngOnInit() {
    this.setCurrentLocation();
     ('this.singlePlaceDetails');
     (this.singlePlaceDetails);
    this.singlePlaceWebsite = this.singlePlaceDetails.website.replace(/(^\w+:|^)\/\//, '');
    this.placeLat = this.singlePlaceDetails.address.lat;
    this.placeLng = this.singlePlaceDetails.address.lng;
    this.setCurrentLocation();
  }

  calculateDistance(x1: number, y1: number, x2: number, y2: number) {
      let result = 0;
      const RADIANS: number = 180 / 3.14159265;
      const METRES_IN_MILE = 1609.34;
      if (this.placeLat === this.currentLatitude && this.placeLng === this.currentLongitude) {
        result = 0;
      } else {
        // Calculating Distance between Points
        let lt1 = this.placeLat / RADIANS;
        let lg1 = this.placeLng / RADIANS;
        let lt2 = this.currentLatitude / RADIANS;
        let lg2 = this.currentLongitude / RADIANS;
        // radius of earth in miles (3,958.8) * metres in a mile * position on surface of sphere...
        result = (3958.8 * METRES_IN_MILE) * Math.acos(Math.sin(lt1) * Math.sin(lt2) + Math.cos(lt1) * Math.cos(lt2) * Math.cos(lg2 - lg1));
      }
      this.distance = Math.round(result * 1.609344);
      //  (Math.round(result * 1.609344));
      // return result;
  }

  findPlaceRoute(id: number) {
    this.places.getPlaceRoute(id).subscribe( data => {
      this.placeMap = data;
      // window.location.href = this.placeMap;
      window.open(this.placeMap, 'blank');
    }, error => {
      //  (error);
    });
  }

 setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.currentLatitude = position.coords.latitude;
        this.currentLongitude = position.coords.longitude;
        this.calculateDistance(this.placeLat, this.placeLng, this.currentLatitude, this.currentLongitude);
      });
    }
  }
}
