import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CommonsService } from '../../shared/commons.service';
import { PlacesService } from '../../shared/places.service';

@Component({
  selector: 'app-featured-place-ad',
  templateUrl: './featured-place-ad.component.html',
  styleUrls: ['./featured-place-ad.component.scss']
})
export class FeaturedPlaceAdComponent implements OnInit {
  FaturedAddItems;
  getPlaceId;
  featuredPlacesId;
  starRating = 0;
  avgRating;
  langURL = localStorage.getItem('current_lang');
  @Input() FaturedAddItemsChild;

  constructor(private commons: CommonsService,
              private placesServices: PlacesService,
              private router: Router) { }

  ngOnInit() {
    if (this.FaturedAddItemsChild) {
      // console.log(this.FaturedAddItemsChild)
    }
  }
}
