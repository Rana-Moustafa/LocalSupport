import { Component, OnInit, ElementRef, NgZone, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MapsAPILoader, MouseEvent } from '@agm/core';
import { PlacesService } from '../../shared/places.service';
import { TranslationService } from '../../shared/translation.service';
import { UserDataService } from '../../shared/user-data.service';
import { Options, LabelType } from 'ng5-slider';
import { NgxImageCompressService } from 'ngx-image-compress';
import { CommonsService } from '../../shared/commons.service';
import { ImageCroppedEvent } from 'ngx-image-cropper';

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
  zoom = 15;
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
  noImages = false;
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
  resultDelivery = [];
  resultPayment = [];
  resultCategory = [];
  timePickerFrom = '10:00 am';
  timePickerTo = '7:00 pm';
  allPlaceImages = [];
  selectedFeatureImage;
  uploadedImage;
  imagesCount;
  croppedImage;
  imageChangedEvent: any = '';
  cropper = {
    x1: 0,
    y1: 0,
    x2: 500,
    y2: 500
  };
  langURL = localStorage.getItem('current_lang');
  streetViewControl = false;

  @ViewChild('editPlace', { static: true }) editPlace: NgForm;
  @ViewChild('toggleTimepickerFrom', { static: false }) openTimeFrom: NgForm;
  @ViewChild('toggleTimepickerTo', { static: false }) openTimeTo: NgForm;
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
    this.commons.show();
    this.getFormSelectionItems();
    this.getSinglePlace(this.route.snapshot.params.id);
    this.loadMap();
  }

  markerDragEnd($event: MouseEvent) {
    console.log($event);
    this.latitude = $event.coords.lat;
    this.longitude = $event.coords.lng;
    console.log(this.latitude);
    console.log(this.longitude);
    this.getAddress(this.latitude, this.longitude);
  }

  getAddress(latitude, longitude) {
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
      console.log(results);
      console.log(status);
      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 12;
          this.placeName = results[0].formatted_address;
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }

    });
  }

  getSinglePlace(id) {
    this.places.getSinglePlaceData(id).subscribe(data => {
      this.placeData = data;
      console.log(data);
      this.newplaceFeaturedImage.push(this.placeData.featured_image);
      this.newplaceFeaturedImage.push({ isFeatured: true });
      this.placeName = this.placeData.address.address;
      // this.latitude = JSON.parse(this.placeData.address.lat);
      // this.longitude = JSON.parse(this.placeData.address.lng);
      this.oldLatitude = this.placeData.address.lat;
      this.oldLongitude = this.placeData.address.lng;
      console.log(this.oldLatitude);
      console.log(this.oldLongitude);
      this.allPlaceImages.push({
        url: this.placeData.featured_image.url,
        name: this.placeData.featured_image.name,
        isFeatured: true
      });
      if (this.placeData.images.length > 0) {
        this.placeData.images.forEach((element, key) => {
          this.allPlaceImages.push({ url: element.url, name: element.name, isFeatured: false });
        });
      }

      console.log(this.allPlaceImages);
      this.timePickerFrom = this.placeData.hr_from;
      this.timePickerTo = this.placeData.hr_to;
      this.selected = this.placeData.place_type;
      if (this.placeData.delivery && this.placeData.delivery.length > 0) {
        this.placeData.delivery.forEach((element, key) => {
          this.resultDelivery.push({ name: element, checked: true });
          if (this.formDelivery && (this.formDelivery[key].name === this.resultDelivery[key].name)) {
            this.formDelivery[key].checked = true;
          }
        });
      }

      if (this.placeData.payment_methods && this.placeData.payment_methods.length > 0) {
        this.placeData.payment_methods.forEach((element, key) => {
          this.resultPayment.push({ name: element, checked: true });
          if (this.formPaymentMethod && (this.formPaymentMethod[key].name === this.resultPayment[key].name)) {
            this.formPaymentMethod[key].checked = true;
          }
        });
      }

      if (this.placeData.category && this.placeData.category.length > 0) {
        this.placeData.category.forEach((element, key) => {
          this.resultCategory.push({ name: element, checked: true });
          if (this.formCategories && (this.formCategories[key].name === this.resultCategory[key].name)) {
            this.formCategories[key].checked = true;
          }
          console.log(this.resultCategory);
        });
      }
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
      this.formSelection = data;
      this.openTimeFrom = this.formSelection.hr_from;
      this.openTimeTo = this.formSelection.hr_to;
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
          this.placeName = place.formatted_address;
          this.cityName = place.address_components[2].long_name;
          this.addressInfo.push(this.placeName);
          this.addressInfo.push(this.cityName);
        });
      });
    });
  }

  // sent data
  sendCheckedCategories(): void {
    this.selectedCategories = this.formCategories ? this.formCategories.filter((category) => category.checked) : '';
    // this.selectedType = this.formType ? this.formType.filter((type) => type.checked) : '';
    this.selectedDelivery = this.formDelivery ? this.formDelivery.filter((delivery) => delivery.checked) : '';
    this.selectedPaymentMethod = this.formPaymentMethod ? this.formPaymentMethod.filter((method) => method.checked) : '';
  }



  fileChangeEvent(event: any) {
    console.log(event);
    this.imageChangedEvent = event;
    this.uploadedImage = event.target.files[0].name;
    this.imagesCount = event.target.files.length;
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = {};
    console.log(event);
    this.croppedImage = event.base64;
  }

  loadImageFailed() {
    console.log('error loading image');
  }
  updateProfilePicture() {
    console.log(this.croppedImage);
    console.log(this.placeData.images);
    // this.placeData.images.push(this.croppedImage);
    this.allPlaceImages.push({ url: this.croppedImage, name: this.uploadedImage, isFeatured: false });
    console.log(this.allPlaceImages);
    if (this.allPlaceImages.length > 6) {
      this.maxNumber = true;
    } else if (this.allPlaceImages.length < 1) {
      this.noImages = true;
    }
  }
  removeImage(index, imageUrl) {
    if (imageUrl === this.newplaceFeaturedImage[0].url) {
      this.newplaceFeaturedImage[0].url = '';
      this.newplaceFeaturedImage[0].name = '';
      this.allPlaceImages.splice(index, 1);
    } else {
      this.allPlaceImages.splice(index, 1);
    }
    if (this.allPlaceImages.length === 0) {
      this.noImages = true;
    }

  }


  updatePlace(form: NgForm) {
    this.allPlaceImages = this.allPlaceImages.filter((image) => image.url !== this.newplaceFeaturedImage[0].url);
    console.log(this.allPlaceImages);
    this.openFrom = this.openTimeFrom;
    this.openTo = this.openTimeTo;
    form.value.openFrom = this.openFrom.time.toLowerCase();
    form.value.openTo = this.openTo.time.toLowerCase();
    this.sendCheckedCategories();
    if (!this.latitude && !this.longitude) {
      this.newLatitude = this.oldLatitude;
      this.newLongitude = this.oldLongitude;
      this.placeName = this.placeData.address.address;
    } else {
      this.newLatitude = this.latitude;
      this.newLongitude = this.longitude;
    }


    this.openFrom = this.openTimeFrom;
    this.openTo = this.openTimeTo;
    this.openFrom = this.openTimeFrom;
    this.openTo = this.openTimeTo;
    this.selectedType = form.value.subcats;
    this.places.editSelectedPlace(
      form.value,
      this.allPlaceImages,
      this.newplaceFeaturedImage,
      this.addressInfo,
      this.selectedType,
      this.selectedCategories,
      this.selectedDelivery,
      this.selectedPaymentMethod,
      this.newLatitude,
      this.newLongitude,
      this.placeData.id
    ).subscribe(data => {
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

  selectedFeaturedImage(name, url) {
    console.log(name, url);
    // this.newplaceFeaturedImage = [];
    this.featuredImageName = name;
    this.featuredImageUrl = url;
    this.newplaceFeaturedImage[0].name = this.featuredImageName;
    this.newplaceFeaturedImage[0].url = this.featuredImageUrl;
    // this.newplaceFeaturedImage.push({ name: this.featuredImageName, url: this.featuredImageUrl, isFeatured: true});
    // this.newplaceFeaturedImage.push(this.featuredImageUrl);
    // this.checkValidImages();
    this.featuredImageError = false;
    this.noFeaturedImage = false;

  }
}
