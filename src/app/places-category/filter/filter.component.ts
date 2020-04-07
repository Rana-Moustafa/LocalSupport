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
  placeType: any;
  selectedActivities;
  openingHours = '10:00 AM';
  closingHours = '10:00 PM';
  minValue = 0;
  maxValue = 1000;
  selectedPlacesize;
  showSubCategories = false;
  formTypes;
  formCategories;
  formDelivery;
  formPayment;
  selectedTypes;
  selectedCategories;
  selectedDelivery;
  selectedPayment;
  types;


  constructor(
    private router: Router,
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
    this.translation.langUpdated.subscribe(
      (lang) => {
        this.getFormSelectionItems();
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
    this.places.getFormSelections().subscribe(data => {
      this.formSelection = data;
      console.log('filter this.formSelection');
      console.log(this.formSelection);
      this.formTypes = this.formSelection.type;
      this.formCategories = this.formSelection.category;
      this.formDelivery = this.formSelection.delivery;
      this.formPayment = this.formSelection.payment_methods;
      // this.placeType = '';
    }, error => {
      // console.log(error)
    });
  }
  getPlacesTypesItems() {
    this.places.getPlacesTypes().subscribe(data => {
      // this.placesCategories = data;

    }, error => {
      // console.log(error);
    });
  }

  public filterPlaces(form: NgForm) {
    this.sendCheckedCategories();
    this.types = form.value.subcats.key;
    // console.log(this.types);
    const filterObject = this.constructFiltertObject();
    // console.log(filterObject);
    this.placesHandlerEvent.emit(filterObject);

  }

  sendCheckedCategories() {
    this.selectedCategories = this.placesCategories ? this.placesCategories.filter((category) => category.checked) : '';
    this.selectedDelivery = this.accessableBy ? this.accessableBy.filter((access) => access.checked) : '';
    this.selectedPayment = this.features ? this.features.filter((feature) => feature.checked) : '';
  }
  onItemChange(event, size) {
    this.selectedPlacesize = size;
  }
  constructFiltertObject() {

    const filterObject = {
      selectedPayment: this.formPayment.filter((payment) => payment.checked),
      selectedDelivery: this.formDelivery.filter((delivery) => delivery.checked),
      // rating_filter: this.rating,
      distance: this.distanceValue,
      selectedCategory: this.formCategories.filter((category) => category.checked),
      selectedTypes: this.types
    };
    // console.log(filterObject);
    return filterObject;
  }
}
