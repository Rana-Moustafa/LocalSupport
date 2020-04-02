import { Component, OnInit, ElementRef, NgZone, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MapsAPILoader, MouseEvent } from '@agm/core';
import { PlacesService } from '../shared/places.service';
import { TranslationService } from '../shared/translation.service';
import { UserDataService } from '../shared/user-data.service';
import { Options, LabelType } from 'ng5-slider';
import { NgxImageCompressService } from 'ngx-image-compress';
import { CommonsService } from '../shared/commons.service';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { MapsService } from '../shared/maps.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';


@Component({
  selector: 'app-add-new-palce',
  templateUrl: './add-new-palce.component.html',
  styleUrls: ['./add-new-palce.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddNewPalceComponent implements OnInit {

  @ViewChild('addPlace', { static: true }) addPlace: NgForm;
  @ViewChild('toggleTimepickerFrom', { static: true }) openTimeFrom: NgForm;
  @ViewChild('toggleTimepickerTo', { static: true }) openTimeTo: NgForm;
  @ViewChild('search', { static: false }) public searchElementRef: ElementRef;
  public Editor = ClassicEditor;
  placeImagesurl = '';
  result: string;
  nameFile;
  filesize;
  fileType;
  latitude: number;
  longitude: number;
  zoom = 15;
  address: string;
  private geoCoder;
  addPlacePage = true;
  imagesUrls = [];
  imagesNames = [];
  maxNumber = false;
  noImages = true;
  placesCategories;
  showSubCategories = false;
  newplaceFeaturedImage = [];
  placeName;
  selectedType;
  selectedCategories;
  selectedDelivery;
  selectedPaymentMethod;
  formType;
  formCategories;
  formDelivery;
  formPaymentMethod;
  featuredImageName;
  featuredImageUrl;
  cityName;
  addressInfo = [];
  openFrom;
  openTo;
  noImagesUploaded;
  addPlaceFormError = false;
  formErrorMsg;
  isLoading = false;
  formSelection;
  placeSize;
  accessableBy;
  accessablity;
  features;
  foods;
  subCategories;
  activities;
  featuredImageError = false;
  noFeaturedImage = true;
  pattern = '/[0-9\+\-\ ]/';
  showimages = false;
  minValue = 0;
  maxValue = 10000;
  uploadedImage;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  cropper = {
    x1: 0,
    y1: 0,
    x2: 500,
    y2: 500
  };

  marker = {
    lat: 47.3769,
    lng: 8.5417
  }
  imagesCount;
  placeaddress;
  // minPriceRange;
  // maxPriceRange;

  options: Options = {
    floor: 0,
    ceil: 1000,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return '<b>Min:</b> CHF' + value;
          // value = this.minPriceRange;
        case LabelType.High:
          return '<b>Max:</b> CHF' + value;
        //  value = this.maxPriceRange;

        default:
          return 'CHF' + value;
      }
    }

  };
  imgResultBeforeCompress;
  imgResultAfterCompress;
  imagesResultsNames;
  markers;
  streetViewControl = false;
  langURL = localStorage.getItem('current_lang');

  @ViewChild ('placename', {static: false}) addPlaceName;
  constructor(private mapsAPILoader: MapsAPILoader,
              private ngZone: NgZone,
              private places: PlacesService,
              private router: Router,
              private translation: TranslationService,
              private userData: UserDataService,
              private route: ActivatedRoute,
              private imageCompress: NgxImageCompressService,
              private commons: CommonsService,
              private map: MapsService) { }


  ngOnInit() {
    this.commons.show();
    this.commons.darkHeader = true;
    // this.router.navigateByUrl(this.router.url.replace(this.route.snapshot.params.language, localStorage.getItem('current_lang')));
    this.map.getMapLocations().subscribe(data => {
      this.markers = JSON.parse(JSON.stringify(data));
      // console.log(this.markers);
    }, error => {
      // console.log(error);
    });
    this.userData.getUserDetails().subscribe(data => {


    }, error => {
      console.log(error);
      if (error.status === 411) {
        this.router.navigate(['/signin']);
      }
    });

    this.getFormSelectionItems();
    this.getPlacesTypesItems();

    this.translation.langUpdated.subscribe(
      (lang) => {
        localStorage.setItem('current_lang', lang);
        this.router.navigateByUrl(this.router.url.replace(this.route.snapshot.params.language, lang));
        this.getFormSelectionItems();
        this.getPlacesTypesItems();
      }
    );


    this.loadMap();

  }


  fileChangeEvent(event: any) {
    // console.log(event);
    this.imageChangedEvent = event;
    this.uploadedImage = event.target.files[0].name;
    this.imagesCount = event.target.files.length;
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = '';
    // console.log(event);
    this.croppedImage = event.base64;
  }

  loadImageFailed() {
    console.log('error loading image');
  }
  updateProfilePicture() {
    this.imagesUrls.push(this.croppedImage);
    this.imagesNames.push(this.uploadedImage);
    console.log(this.imagesUrls);
    if (this.imagesUrls.length > 5) {
      this.maxNumber = true;
    } else if (this.imagesUrls.length < 1) {
      this.noImages = true;
    } else {
      this.noImages = false;
    }
  }
  // get form field data
  getFormSelectionItems() {
    this.isLoading = true;
    this.places.getFormSelections().subscribe(data => {
      console.log('form selection');
      console.log(data);
      this.formSelection = data;
      this.formType = this.formSelection.type;
      this.formCategories = this.formSelection.category;
      this.formDelivery  = this.formSelection.delivery;
      this.formPaymentMethod = this.formSelection.payment_methods;
      this.isLoading = false;
    }, error => {
      this.isLoading = false;
    });
  }

  getPlacesTypesItems() {
    this.places.getPlacesTypes().subscribe(data => {
      this.placesCategories = data;

    }, error => {
      // console.log(error);
    });
  }
  checkValid() {
    return (this.addPlace.valid && this.placesCategories && this.placesCategories.length && this.placesCategories.find(x => x.checked)
    && this.newplaceFeaturedImage.length);
  }
  checkValidImages() {
    // //console.log(this.noFeaturedImage)
    if (this.imagesUrls.length < 1 ||
      this.imagesUrls.length > 5) {
      this.noImages = true;
      // this.featuredImageError = true;
      return false;
    } else {
      // this.featuredImageError = true;
      return true;
    }

  }
  // sent data
  sendCheckedCategories(): void {
    this.selectedCategories = this.formCategories ? this.formCategories.filter((category) => category.checked) : '';
    this.selectedType = this.formType ? this.formType.filter((type) => type.checked) : '';
    this.selectedDelivery = this.formDelivery ? this.formDelivery.filter((delivery) => delivery.checked) : '';
    this.selectedPaymentMethod = this.formPaymentMethod ? this.formPaymentMethod.filter((method) => method.checked) : '';
  }


  checkPlayground(event, name) {
    if ((name === 'Playground' || name === 'Spielplatz' || name === 'Spielplätze' || name === 'Playgrounds')
    && event.target.checked === true) {
      this.showSubCategories = true;
    } else if ((name === 'Playground' || name === 'Spielplatz' || name === 'Spielplätze' || name === 'Playgrounds') &&
     event.target.checked === false) {
      this.showSubCategories = false;
    }
  }
  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 15;
      }, error => {
        this.latitude = 47.3769;
        this.longitude = 8.5417;
      });
    }
  }
  markerDragEnd($event: MouseEvent) {
    console.log($event);
    this.latitude = $event.coords.lat;
    this.longitude = $event.coords.lng;
    this.getAddress(this.latitude, this.longitude);
  }
  getAddress(latitude, longitude) {
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
      console.log(results);
      console.log(status);
      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 15;
          console.log(results[0].formatted_address)
          this.placeaddress = results[0].formatted_address;
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }
 
    });
  }

  loadMap() {
    this.mapsAPILoader.load().then(() => {
      // this.setCurrentLocation();
      this.geoCoder = new google.maps.Geocoder;
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ['address'],
        componentRestrictions: { country: ['CH', 'DE', 'AT' ] }
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
          this.zoom = 15;
          this.placeName = place.formatted_address;
          this.cityName = place.address_components[2].long_name;
          this.addressInfo.push(this.placeName);
          this.addressInfo.push(this.cityName);
        });
      });
    });
  }

  compressFile() {
  // console.log(this.addPlaceName.value);
   if (!this.maxNumber) {
    this.imageCompress.uploadFile().then(({image, orientation}) => {
        console.log(image);
        this.imgResultBeforeCompress = image;
        this.featuredImageError = true;
        console.warn('Size in bytes was:', this.imageCompress.byteCount(image));

        this.imageCompress.compressFile(image, orientation, 50, 50).then(
          result => {
            this.imgResultAfterCompress = result;
            this.imagesResultsNames = 'place-name-' + this.addPlaceName.value + '-' + this.imageCompress.byteCount(result);
            this.imagesUrls.push(this.imgResultAfterCompress)
            this.imagesNames.push(this.imagesResultsNames);
            console.log(this.imagesUrls);
            console.log(this.imagesNames);
            console.warn('Size in bytes is now:', this.imageCompress.byteCount(result));

            if (this.imagesUrls.length > 5) {
              this.maxNumber = true;
            } else if (this.imagesUrls.length < 1) {
              this.noImages = true;
            } else {
              this.noImages = false;
            }
          }
        );
      });
    return false;
   }
}

  getFileDetails(event) {
    console.log(event);
    if (event.target.files && event.target.files[0]) {
      const filesAmount = event.target.files.length;

      for (let i = 0; i < filesAmount; i++) {
        console.log(event.target.files[i]);
        this.imagesNames.push(event.target.files[i].name);
        // this.imagesUrls.push(this.urls);
        var reader = new FileReader();

        reader.onload = (event: any) => {
          this.imagesUrls.push(event.target.result);
          if (this.imagesUrls.length > 5) {
            this.maxNumber = true;
          } else if (this.imagesUrls.length < 1) {
            this.noImages = true;
          } else {
            this.noImages = false;
          }
        };

        reader.readAsDataURL(event.target.files[i]);
      }
    }
  }



  removeImage(index) {
    if (this.featuredImageName === this.imagesNames[index]) {
      this.featuredImageName = undefined;
      this.noFeaturedImage = true;
      this.newplaceFeaturedImage = [];

      this.imagesUrls.splice(index, 1);
      this.imagesNames.splice(index, 1);
      if (this.imagesUrls.length > 0) {
        this.noImages = false;
        this.featuredImageError = true;
      } else if (this.imagesUrls.length === 0) {
        this.featuredImageError = false;
      }
    } else if (this.imagesUrls.length === 0) {
      this.featuredImageError = false;
    } else {
      this.imagesUrls.splice(index, 1);
      this.imagesNames.splice(index, 1);
    }
    if (this.imagesUrls.length <= 5) {
      this.maxNumber = false;
    } else if (this.imagesUrls.length === 0) {
      this.featuredImageError = false;
    }
    this.checkValidImages();
  }

  selectedFeaturedImage(name, url) {
    this.featuredImageName = name;
    this.featuredImageUrl = url;
    this.newplaceFeaturedImage.push(this.featuredImageName);
    this.newplaceFeaturedImage.push(this.featuredImageUrl);
    this.checkValidImages();
    this.featuredImageError = false;
    this.noFeaturedImage = false;
  }

  newPlace(form: NgForm) {
    this.isLoading = true;

    this.sendCheckedCategories();
    this.openFrom = this.openTimeFrom;
    this.openTo = this.openTimeTo;
    form.value.openFrom = this.openFrom.time.toLowerCase();
    form.value.openTo = this.openTo.time.toLowerCase();
    console.log('this.selectedType');
    console.log(this.selectedType);
    console.log(form.value);
    this.places.addNewPlace(
      form.value,
      this.newplaceFeaturedImage,
      this.addressInfo,
      this.selectedType,
      this.selectedCategories,
      this.selectedDelivery,
      this.selectedPaymentMethod,
      this.imagesNames,
      this.imagesUrls,
      this.latitude,
      this.longitude,
      this.minValue,
      this.maxValue
      ).subscribe(data => {
        // console.log(data);
        this.isLoading = false;
        this.addPlaceFormError = false;
        form.reset();
        this.router.navigate(['/' + this.langURL + '/thank-you']);
      }, error => {
        // console.log(error);
        this.isLoading = false;
        this.addPlaceFormError = true;
        this.formErrorMsg = error.error.message;
      });
  }
}
