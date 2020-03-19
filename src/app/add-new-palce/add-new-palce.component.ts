import { Component, OnInit, ElementRef, NgZone, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MapsAPILoader } from '@agm/core';
import { PlacesService } from '../shared/places.service';
import { TranslationService } from '../shared/translation.service';
import { UserDataService } from '../shared/user-data.service';
import { Options, LabelType } from 'ng5-slider';
import { NgxImageCompressService } from 'ngx-image-compress';
import { CommonsService } from '../shared/commons.service';

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

  placeImagesurl = '';
  result: string;
  nameFile;
  filesize;
  fileType;
  latitude: number;
  longitude: number;
  zoom: number;
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
  selectedCategories;
  selectedAccessableBy;
  selectedFeatures;
  selectedFood;
  selectedSubCategories;
  selectedAccessability;
  selectedActivities;
  selectedSize;
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
              private commons: CommonsService) { }


  ngOnInit() {
    this.commons.darkHeader = true;
    this.router.navigateByUrl(this.router.url.replace(this.route.snapshot.params.language, localStorage.getItem('current_lang')));

    this.userData.getUserDetails().subscribe(data => {


    }, error => {
      // console.log(error);
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


  // get form field data
  getFormSelectionItems() {
    this.isLoading = true;
    this.places.getFormSelections().subscribe(data => {

      // console.log(data);
      this.formSelection = data;
      this.accessableBy = this.formSelection.accessible_by;
      this.accessablity = this.formSelection.accessibility;
      this.foods = this.formSelection.food;
      this.features = this.formSelection.features;
      this.activities = this.formSelection.activities;
      this.subCategories = this.formSelection.places_kind;
      this.placeSize = this.formSelection.size;
      // console.log(this.placeSize);
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
    // //console.log(this.imagesUrls.length)
    if (!this.noFeaturedImage && this.imagesUrls.length <= 5) {
      this.noImages = false;
      this.featuredImageError = true;
      return true;
    } else if (this.imagesUrls.length <= 1 ||
      this.imagesUrls.length >= 5 ||
      (this.noFeaturedImage)) {
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
    this.selectedCategories = this.placesCategories ? this.placesCategories.filter((category) => category.checked) : '';
    this.selectedAccessableBy = this.accessableBy ? this.accessableBy.filter((access) => access.checked) : '';
    this.selectedFeatures = this.features ? this.features.filter((feature) => feature.checked) : '';
    this.selectedFood = this.foods ? this.foods.filter((food) => food.checked) : '';
    this.selectedAccessability = this.accessablity ? this.accessablity.filter((accessble) => accessble.checked) : '';
    this.selectedActivities = this.activities ? this.activities.filter((activity) => activity.checked) : '';
    this.selectedSize = this.placeSize ? this.placeSize.filter((size) => size.checked) : '';

    // you could use an EventEmitter and emit the selected values here, or send them to another API with some service

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
          this.zoom = 20;
          this.placeName = place.formatted_address;
          this.cityName = place.address_components[2].long_name;
          this.addressInfo.push(this.placeName);
          this.addressInfo.push(this.cityName);
        });
      });
    });
  }

  compressFile() {
    // console.log(this.addPlaceName.value)
   if (!this.maxNumber) {
    this.imageCompress.uploadFile().then(({image, orientation}) => {
        // console.log(image)
        this.imgResultBeforeCompress = image;
        this.featuredImageError = true;
        console.warn('Size in bytes was:', this.imageCompress.byteCount(image));

        this.imageCompress.compressFile(image, orientation, 50, 50).then(
          result => {
            this.imgResultAfterCompress = result;
            this.imagesResultsNames = 'place-name-' + this.addPlaceName.value + '-' + this.imageCompress.byteCount(result);
            this.imagesUrls.push(this.imgResultAfterCompress)
            this.imagesNames.push(this.imagesResultsNames);
            // console.log(this.imagesUrls)
            // console.log(this.imagesNames)
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
    // console.log(event)
    if (event.target.files && event.target.files[0]) {
      const filesAmount = event.target.files.length;

      for (let i = 0; i < filesAmount; i++) {
        // console.log(event.target.files[i]);
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
    // for (var i = 0; i < event.target.files.length; i++) {
    //   var name = event.target.files[i].name;
    //   var type = event.target.files[i].type;
    //   var size = event.target.files[i].size;
    //   var modifiedDate = event.target.files[i].lastModifiedDate;
    //   this.nameFile = 'File Name: ' + name + "\n";
    //   this.filesize = 'Size: ' + Math.round(size / 1024) + " KB";
    //   this.fileType = 'Type: ' + type + "\n";
    //   ////console.log('Name: ' + name + "\n" +
    //     'Type: ' + type + "\n" +
    //     'Last-Modified-Date: ' + modifiedDate + "\n" +
    //     'Size: ' + Math.round(size / 1024) + " KB");
    // }
  }



  removeImage(index) {
    // console.log(this.imagesNames[index])
    // console.log(this.featuredImageName)
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

    this.places.addNewPlace(
      form.value,
      this.newplaceFeaturedImage,
      this.addressInfo,
      this.selectedCategories,
      this.selectedAccessableBy,
      this.selectedAccessability,
      this.selectedFeatures,
      this.selectedFood,
      this.selectedActivities,
      this.imagesNames,
      this.imagesUrls,
      this.latitude,
      this.longitude,
      this.minValue,
      this.maxValue,
      )
      .subscribe(data => {
        // console.log(data);
        this.isLoading = false;
        this.addPlaceFormError = false;
        form.reset();
        this.router.navigate([this.langURL + '/thank-you']);
      }, error => {
        // console.log(error);
        this.isLoading = false;
        this.addPlaceFormError = true;
        this.formErrorMsg = error.error.message;
      });
  }
}
