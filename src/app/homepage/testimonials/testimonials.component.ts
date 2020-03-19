import { Component, OnInit, ViewChild, Input, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonsService } from '../../shared/commons.service';

@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.scss']
})
export class TestimonialsComponent implements OnInit {
  FaturedAddItems;
  getPlaceId;
  featuredPlacesId;
  starRating = 0;
  avgRating;
  @Input() testimonialsData;
  @Input() testimonialsDataChild;
  GetTestimonialsItem;
  arrow;


  public sliderOPT: any = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    nav: true,
    items: 1,
    lazyLoad: true,
    // navText: this.arrow,
    navText: ['<div class="nav-btn prev-slide"><i class="fa fa-angle-left" aria-hidden="true"></i></div>',
    '<div class="nav-btn next-slide"><i class="fa fa-angle-right" aria-hidden="true"></i></div>'],
    responsive: {
      0: {
        items: 1
      }
    }
  };

  constructor(private commons: CommonsService,
              private router: Router) { }

  ngOnInit() {

  }

}
