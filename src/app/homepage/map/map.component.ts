import { Component, OnInit, ViewChild, ElementRef, NgZone, ViewEncapsulation } from '@angular/core';
import { MapsAPILoader, MouseEvent, GoogleMapsAPIWrapper, AgmMap, LatLngBounds, LatLngBoundsLiteral } from '@agm/core';
import { ZoomControlOptions, ControlPosition, ZoomControlStyle } from '@agm/core/services/google-maps-types';
import { MapsService } from '../../shared/maps.service';
import { PlacesService } from '../../shared/places.service';
import { TranslationService } from '../../shared/translation.service';
import { SearchResultsService } from '../../shared/search-results.service';
import { Router } from '@angular/router';
import { ClusterStyle } from '@agm/js-marker-clusterer/services/google-clusterer-types';

interface Marker {
  address: string;
  id: number;
  lat: number;
  lng: number;
  place_type?: string;
  slug: string;
  title: string;
}

declare var google: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class MapComponent implements OnInit {

  title = 'AGM project';
  latitude: number;
  longitude: number;
  zoom: number;
  address: string;
  private geoCoder;
  markerIcon = {
    url: '../../assets/images/ic-location-dark-blue.svg',
    scaledSize: { height: 30, width: 30 }
  };

  currentMarkerIcon = {
    url: '../../assets/images/near-me.svg',
    scaledSize: { height: 30, width: 30 }
  };

  @ViewChild('search', { static: false })
  public searchElementRef: ElementRef;
  @ViewChild('AgmMap', { static: false }) agmMap: AgmMap;

  markers: Marker[] = [];
  lat;
  lng;

  styles = [
    {
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#f5f5f5"
        }
      ]
    },
    {
      "elementType": "labels.icon",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#616161"
        }
      ]
    },
    {
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#f5f5f5"
        }
      ]
    },
    {
      "featureType": "administrative.land_parcel",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#bdbdbd"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#eeeeee"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#757575"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#e5e5e5"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#9e9e9e"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#ffffff"
        }
      ]
    },
    {
      "featureType": "road.arterial",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#757575"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#dadada"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#616161"
        }
      ]
    },
    {
      "featureType": "road.local",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#9e9e9e"
        }
      ]
    },
    {
      "featureType": "transit.line",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#e5e5e5"
        }
      ]
    },
    {
      "featureType": "transit.station",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#eeeeee"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#c9c9c9"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#9e9e9e"
        }
      ]
    }
  ];

  clusterStyles: ClusterStyle[] =  [
    {
        textColor: '#000',
        url: '../../assets/clusters/clusters-1.svg',
        height: 50,
        width: 50
    },
    {
        textColor: '#000',
        url: '../../assets/clusters/clusters-2.svg',
        height: 50,
        width: 50
    }
];
  previous;
  categoryTab;
  langURL = localStorage.getItem('current_lang');
  streetViewControl = false;
  zoomControlOptions: ZoomControlOptions = {
    position: ControlPosition.LEFT_BOTTOM,
    style: ZoomControlStyle.LARGE
  };
  placesTypesTabs;
  selected;
  fitBoundsMarkers = true;
  seachResults;
www = []
  constructor(private mapsAPILoader: MapsAPILoader,
              private ngZone: NgZone,
              private map: MapsService,
              private places: PlacesService,
              private translation: TranslationService,
              public searchResultsService: SearchResultsService,
              private router: Router) { }

  ngOnInit() {
    const uA = navigator.userAgent;
    const vendor = navigator.vendor;

    // if ('geolocation' in navigator) {
    //   navigator.geolocation.getCurrentPosition((position) => {
    //     console.log('current location');
    //     console.log(this.latitude);
    //     console.log(this.latitude);
    //     // this.latitude = position.coords.latitude;
    //     // this.longitude = position.coords.longitude;
    //   }, error => {
    //     console.log(error);
    //     // if (/Safari/i.test(uA) && /Apple Computer/.test(vendor) && !/Mobi|Android/i.test(uA)) {
    //     //   confirm('Please allow location detection from : System Preferences->Security & Privacy-> Privacy ');
    //     // }
    //   });
    // }
    this.translation.langUpdated.subscribe(
      (lang) => {
        // console.log(lang)
        this.selectedCategory();
      }
    );

    this.selectedCategory();
    // this.loadMap();
  }

  loadTabs() {
    this.selectedCategory();
    // if (localStorage.getItem('current_lang') === 'en') {
    //   this.selectedCategory(17, 3);
    // } else {
    //   this.selectedCategory(3, 3);
    // }
  }

  selectedCategory() {

    if (this.searchElementRef) {
      if ((this.searchElementRef.nativeElement.value).length < 1) {
        this.fitBoundsMarkers = true;
      } else {
        this.fitBoundsMarkers = false;
      }

    }

    //  this.selected = e;
    this.map.getMapLocations().subscribe(data => {

      this.markers = JSON.parse(JSON.stringify(data));
      console.log(this.markers);
    }, error => {
      // console.log(error);
    });
  }

  loadMap() {
    this.mapsAPILoader.load().then(() => {
      // this.setCurrentLocation();
      this.geoCoder = new google.maps.Geocoder;

      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ['geocode'],
        componentRestrictions: { country: ['CH', 'AT', 'DE'] }
      });
      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          // get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          // verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
          // set latitude, longitude and zoom
          this.lat = place.geometry.location.lat();
          this.lng = place.geometry.location.lng();
          console.log(this.lat)
          console.log(this.lng)
          this.zoom = 10;
        });
      });
    });
  }
  clickedMarker(infowindow) {
    if (this.previous) {
      this.previous.close();
    }
    this.previous = infowindow;
  }

  // Get Current Location Coordinates
  setCurrentLocation(lat, lng) {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.lat = this.latitude;
        this.lng = this.longitude;
        this.zoom = 10;
        this.getAddress(this.latitude, this.longitude);
      });
    }
  }


  markerDragEnd($event: MouseEvent) {
    // console.log($event);
    this.latitude = $event.coords.lat;
    this.longitude = $event.coords.lng;
    this.getAddress(this.latitude, this.longitude);
  }

  getAddress(latitude, longitude) {
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {

      console.log(latitude, ' ', longitude);
      if (status === 'OK') {
        if (results[0]) {
          // this.zoom = 10;
          this.address = results[0].formatted_address;
          // console.log(results[0]);
          this.searchElementRef.nativeElement.value = this.address;
        } else {
          window.alert('No results found');
        }
      } else {
        console.log('Geocoder failed due to: ' + status);
      }

    });
  }
  searchPlaces() {
    // this.SearchResultsService.searchQuery(this.searchElementRef.nativeElement.value)
    this.router.navigate(['/' + this.langURL + '/search-result'],
      { queryParams: { search: JSON.stringify(this.searchElementRef.nativeElement.value) } });
  }
}
