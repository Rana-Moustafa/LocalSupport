import { Component, OnInit, ViewEncapsulation, EventEmitter, Output, NgModule, Input, ViewChild } from '@angular/core';
import { NgForm, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Options, LabelType } from 'ng5-slider';
import { PlacesService } from '../../shared/places.service';
import { TranslationService } from '../../shared/translation.service';
import { UserDataService } from '../../shared/user-data.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})

export class FilterComponent implements OnInit {
  @Output() redirect: EventEmitter<any> = new EventEmitter();
  @Input() rating = 0;
  @Input() itemId: number;
  @Output() ratingClick: EventEmitter<any> = new EventEmitter<any>();
  @Output() placesHandlerEvent: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('filterForm', { static: true }) filterForm: NgForm;

  inputName: string;
  reviewsCount = 6;
  placeComments;
  commentsCount;
  isLiked;
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
  placesCategories;
  category;
  selectedCategories;
  placeType: any;
  selectedActivities;
  openingHours = '10:00 AM';
  closingHours = '10:00 PM';
  minValue = 0;
  maxValue = 1000;
  selectedPlacesize;
  showSubCategories = false;

  constructor(private router: Router,
              private places: PlacesService,
              private translation: TranslationService) { }

  options: Options = {
    floor: 0,
    ceil: 1000,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return '<b>CHF </b>' + value;
        case LabelType.High:
          return '<b>CHF </b>' + value;
        default:
          return 'CHF' + value;
      }
    }
  };

  distanceValue = 0;
  distanceOptions: Options = {
    floor: 0,
    ceil: 1000
  };

  data: any = { text: 'example' };
  sideNav = false;
  min = 0;
  max = 60;
  range = [6, 20];

  sliderControl: FormControl = new FormControl(100);

  sliderOption: Options = {
    floor: 0,
    ceil: 250
  };


  ngOnInit() {
    this.inputName = this.itemId + '_rating';
    this.getFormSelectionItems();
    this.getPlacesTypesItems();
    this.translation.langUpdated.subscribe(
      (lang) => {
        this.getFormSelectionItems();
        this.getPlacesTypesItems();
      }
    );
  }


  changeComponent(url: string) {
    this.redirect.emit(this.data);
    this.router.navigate(['places-category']);
  }
  toggleSideNav() {
    this.sideNav = !this.sideNav;
  }

  checkPlayground(event, name) {
    // console.log(name)
    // console.log(event.target.checked)
    if ((name === 'Playground' || name === 'Spielplatz' || name === 'Spielplätze' || name === 'Playgrounds')
    && event.target.checked === true) {
      this.showSubCategories = true;
    } else if ((name === 'Playground' || name === 'Spielplatz' || name === 'Spielplätze' || name === 'Playgrounds')
     && event.target.checked === false) {
      this.showSubCategories = false;
    }
  }

  onClick(rating: number): void {
    this.rating = rating;
  }

  resetForm(): void {
    this.sliderControl.reset(100);
  }
  getFormSelectionItems() {
    this.isLoading = true;
    this.places.getFormSelections().subscribe(data => {

      // console.log(this.formSelection = data);
      this.formSelection = data;
      this.accessableBy = this.formSelection.accessible_by;
      this.accessablity = this.formSelection.accessibility;
      this.foods = this.formSelection.food;
      this.features = this.formSelection.features;
      this.activities = this.formSelection.activities;
      this.subCategories = this.formSelection.places_kind;
      this.isLoading = false;
      this.placesCategories = this.placesCategories;
      this.selectedCategories = this.selectedCategories;
      this.placeSize = this.formSelection.size;
      this.isLoading = false;
      // this.placeType = '';
    }, error => {
      // console.log(error)
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

  public filterPlaces(form) {
    const filterObject = this.constructFiltertObject();
    console.log(filterObject);
    this.placesHandlerEvent.emit(filterObject);
    // this.places.filterPlaces(filterObject).subscribe(data => {
    //   console.log(data);
    //   form.reset();
    //   if (data) {
    //     this.placesHandlerEvent.emit(data);
    //   } else {
    //   }
    // }, (errorMessage) => {
    //   // console.log(errorMessage);
    // });

  }
  onItemChange(event, size) {
    this.selectedPlacesize = size;
  }
  constructFiltertObject() {

    const filterObject = {
      size: this.placeSize.filter(size => size.checked === true),
      acescsible_by: this.accessableBy.filter(accessable => accessable.checked === true),
      // accessablity: this.accessablity.filter(accessablity => accessablity.checked == true).map(obj => obj.name).join(','),
      accessablity: this.accessablity.filter(accessablity => accessablity.checked === true),
      // selectedActivities : this.activities.filter((activity) => activity.checked),
      selectedFeatures: this.features.filter((feature) => feature.checked),
      selectedFood: this.foods.filter((food) => food.checked),
      rating_filter: this.rating,
      distance: this.distanceValue,
      selectedCategory: this.placesCategories.filter((category) => category.checked),

      // place_type: this.placeType.filter(type => type.checked == true).map(type => type.id).join(','), 
      minValue: this.minValue,
      maxValue: this.maxValue
    };
    return filterObject;
  }
}
