import { Component, OnInit, Input } from '@angular/core';
import { PlacesService } from '../../shared/places.service';
import { TranslationService } from '../../shared/translation.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { UserStatusService } from 'src/app/shared/user-status.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-categories-slider',
  templateUrl: './categories-slider.component.html',
  styleUrls: ['./categories-slider.component.scss']
})
export class CategoriesSliderComponent implements OnInit {
  categoryEmpty = false;
  placeData;
  favoritePlacesSliderData = [];

  @Input() placesCategoriesChildId;
  @Input() placesCategoriesChildName;
  @Input() favoritePlacesSliderChild;
  @Input() productsData;

  customOptions: OwlOptions = {
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    autoplay: false,
    navSpeed: 700,
    items: 5,
    autoWidth: true,
    rewind: false,
    nav: true,
    lazyLoad: true,
    navText: ['<div class="nav-btn prev-slide"><i class="fa fa-angle-left" aria-hidden="true"></i></div>',
      '<div class="nav-btn next-slide" (click)="getCategoriesSliders()"><i class="fa fa-angle-right" aria-hidden="true"></i></div>'],
    responsive: {
      0: {
        items: 2,
        nav: true
      },
      400: {
        items: 3,
      },
      500: {
        items: 3,
      },
      670: {
        items: 4,
      },
      1000: {
        items: 5,
      },
      1200: {
        items: 6
      }
    }
  };

  langURL = localStorage.getItem('current_lang');

  categorySliderDetails;
  categorySliderTitle;
  categoriesNames;
  favoritePlacesSlider;
  page = 0;
  perPage = 100;
  allSliders = [];
  searchAll = JSON.stringify('');

  constructor(private places: PlacesService,
              private translation: TranslationService,
              public userStatus: UserStatusService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    //  (this.productsData);
    this.translation.addRouterLangParam();
    this.translation.langUpdated.subscribe(
      (lang) => {
       this.getCategoriesSliders();
      }
    );

    this.getCategoriesSliders();
  }

  placeTypes() {
    this.places.getPlacesTypes().subscribe(data => {
      this.categoriesNames = JSON.parse(JSON.stringify(data));
    }, error => {
      //  (error)
    });
  }
  getCategoriesSliders() {

    this.places.getPlacesCategories(this.placesCategoriesChildId, 'sort_latest', 1, 15).subscribe(data => {
       (data);
      this.categorySliderDetails = JSON.parse(JSON.stringify(data));
      if (this.categorySliderDetails.length === 0) {
        this.categoryEmpty = true;
      } else if (!this.favoritePlacesSlider || (this.favoritePlacesSlider && this.favoritePlacesSlider.length < 1)) {
      } else {
        this.categoryEmpty = false;
      }
    }, error => {
      //  (error);
    });
  }
  showMorePlaces(cateId, catName) {
    //  (cateId);
    //  (catName);
    this.router.navigateByUrl('/' + this.langURL + '/places-category', { state: { id: cateId, name: catName } });
  }

  updateFavList($event) {
    this.placeData = $event;
    //  ($event);
    //  (this.favoritePlacesSliderData);

    if (this.placeData.is_favorited) {
      this.favoritePlacesSliderData.push($event);
      //  (this.favoritePlacesSliderData);
    } else {

    }

  }
}
