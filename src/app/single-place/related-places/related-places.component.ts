import { Component, OnInit, ViewChild, Input } from '@angular/core';
// import { OwlCarousel } from 'ngx-owl-carousel';
import { PlacesService } from '../../shared/places.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UserStatusService } from '../../shared/user-status.service';
import { TranslationService } from '../../shared/translation.service';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-related-places',
  templateUrl: './related-places.component.html',
  styleUrls: ['./related-places.component.scss']
})
export class RelatedPlacesComponent implements OnInit {
  // @ViewChild('owlElement', { static: true }) owlElement: OwlCarousel;

  langURL = localStorage.getItem('current_lang');
  arrow;

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    autoplay: false,
    navSpeed: 700,
    items: 6,
    nav: true,
    navText:['<div class="nav-btn prev-slide"><i class="fa fa-angle-left" aria-hidden="true"></i></div>',
    '<div class="nav-btn next-slide"><i class="fa fa-angle-right" aria-hidden="true"></i></div>'],
    autoWidth: true,
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
        items: 6,
        nav: true,
        loop: false
      }
    }
  }

  relatedPlacesIds = '';
  @Input() returnedRelatedPlaces;
  relatedPlacesList;
  starRating = 4.5;
  favPlace = false;

  constructor(private places: PlacesService,
              private route: ActivatedRoute,
              private userStatus: UserStatusService,
              private router: Router,
              private translation: TranslationService) { }
  ngOnInit() {

    for (var i = 0; i < this.returnedRelatedPlaces.length; i++){
      this.relatedPlacesIds = this.relatedPlacesIds + '&place_ids[' + i + ']=' + this.returnedRelatedPlaces[i];
    }

    this.listRelatedPlaces();
    this.translation.langUpdated.subscribe(
      (lang) => {
        // this.dict = this.translation.getLang();
        localStorage.setItem('current_lang', lang);
        // console.log(this.returnedRelatedPlaces)
        this.listRelatedPlaces();
      }
    );
  }

  listRelatedPlaces() {
    // console.log(this.relatedPlacesIds)
    this.places.getRelatedPlaces(this.relatedPlacesIds).subscribe( data => {
      // console.log(data)
      this.relatedPlacesList  = data;
    }, error => {
      // console.log(error);
    });
  }

  addToFav(id) {
    this.places.addToFavPlaces(id).subscribe( data => {
      this.favPlace = !this.favPlace;
    }, error => {
      // console.log(error);
    });
  }
}
