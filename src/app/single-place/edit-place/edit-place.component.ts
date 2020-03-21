import { Component, OnInit, ElementRef, NgZone, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MapsAPILoader } from '@agm/core';
import { PlacesService } from '../../shared/places.service';
import { TranslationService } from '../../shared/translation.service';
import { UserDataService } from '../../shared/user-data.service';
import { Options, LabelType } from 'ng5-slider';
import { NgxImageCompressService } from 'ngx-image-compress';
import { CommonsService } from '../../shared/commons.service';


@Component({
  selector: 'app-edit-place',
  templateUrl: './edit-place.component.html',
  styleUrls: ['./edit-place.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EditPlaceComponent implements OnInit {
  private geoCoder;
  latitude;
  longitude;
  zoom;
  placeName;
  cityName;
  addressInfo = [];
  placeData;
  formSelection;
  formType;
  formCategories;
  formDelivery;
  formPaymentMethod;
  selected;
  result: string;
  nameFile;
  filesize;
  fileType;
  address: string;
  addPlacePage = true;
  imagesUrls = [];
  imagesNames = [];
  maxNumber = false;
  noImages = true;
  placesCategories;
  showSubCategories = false;
  newplaceFeaturedImage = [];
  selectedType;
  selectedCategories;
  selectedDelivery;
  selectedPaymentMethod;
  featuredImageName;
  featuredImageUrl;
  openFrom;
  openTo;
  noImagesUploaded;
  addPlaceFormError = false;
  formErrorMsg;
  isLoading = false;
  placeSize;
  accessableBy;
  accessablity;
  features;
  foods;
  subCategories;
  activities;
  featuredImageError = false;
  noFeaturedImage = true;
  oldLatitude;
  oldLongitude;
  newLatitude;
  newLongitude;
  langURL = localStorage.getItem('current_lang');

  @ViewChild('addPlace', { static: true }) addPlace: NgForm;
  @ViewChild('toggleTimepickerFrom', { static: true }) openTimeFrom: NgForm;
  @ViewChild('toggleTimepickerTo', { static: true }) openTimeTo: NgForm;
  @ViewChild('search', { static: false }) public searchElementRef: ElementRef;
  @ViewChild('address', { static: false }) public addressElementRef: ElementRef;

  constructor(private places: PlacesService,
              private route: ActivatedRoute,
              private mapsAPILoader: MapsAPILoader,
              private ngZone: NgZone,
              private router: Router,
              private translation: TranslationService,
              private userData: UserDataService,
              private imageCompress: NgxImageCompressService,
              private commons: CommonsService) { }

  ngOnInit() {
    this.getFormSelectionItems();
    this.getSinglePlace(this.route.snapshot.params.id);
    this.loadMap();
    console.log(this.route.snapshot.params.id);
  }

  getSinglePlace(id) {
    this.places.getSinglePlaceData(id).subscribe(data => {
      this.placeData = data;
      this.selected = this.placeData.place_type;
      this.oldLatitude = this.placeData.address.lat;
      this.oldLongitude = this.placeData.address.lng;
      console.log(this.placeData);
    }, error => {
      console.log(error);
    });
  }

  chooseType(e) {
    this.selected = e;
  }
  // get form field data
  getFormSelectionItems() {
    this.places.getFormSelections().subscribe(data => {
      console.log('form selection');
      console.log(data);
      this.formSelection = data;
      this.formType = this.formSelection.type;
      this.formCategories = this.formSelection.category;
      this.formDelivery = this.formSelection.delivery;
      this.formPaymentMethod = this.formSelection.payment_methods;
      // this.isLoading = false;
    }, error => {
      // this.isLoading = false;
    });
  }

  loadMap() {
    this.mapsAPILoader.load().then(() => {
      // this.setCurrentLocation();
      this.geoCoder = new google.maps.Geocoder;

      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ['address'],
        componentRestrictions: { country: ['CH', 'DE', 'AT'] }
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
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 20;
          console.log(place);
          console.log(place.formatted_address);
          this.placeName = place.formatted_address;
          this.cityName = place.address_components[2].long_name;
          this.addressInfo.push(this.placeName);
          this.addressInfo.push(this.cityName);
          console.log(this.addressInfo);
        });
      });
    });
  }
  updatePlace(form: NgForm) {
    if (!this.latitude && !this.longitude) {
      console.log('old')
      this.newLatitude = this.oldLatitude;
      this.newLongitude = this.oldLongitude;
      this.placeName = this.placeData.address.address;
      console.log(this.placeName);
    } else {
      console.log('new')
      this.newLatitude = this.latitude;
      this.newLongitude = this.longitude;
      console.log(this.placeName);
    }

    this.openFrom = this.openTimeFrom;
    this.openTo = this.openTimeTo;
    form.value.openFrom = this.openFrom.time.toLowerCase();
    form.value.openTo = this.openTo.time.toLowerCase();
    console.log('this.selectedType');
    console.log(this.selectedType);
    console.log(form.value);
    this.places.editSelectedPlace(
      form.value,
      this.addressInfo,
      this.selectedType,
      this.selectedCategories,
      this.selectedDelivery,
      this.selectedPaymentMethod,
      this.newLatitude,
      this.newLongitude,
      this.placeData.id
    ).subscribe(data => {
      console.log('editeedddddddddd');
      console.log(data);
      this.isLoading = false;
      this.addPlaceFormError = false;
      form.reset();
      this.router.navigate([this.langURL + '/thank-you']);
    }, error => {
      console.log(error);
      this.isLoading = false;
      this.addPlaceFormError = true;
      this.formErrorMsg = error.error.message;
    });
  }
}
