import { Component, OnInit, Input , OnChanges } from '@angular/core';


@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit, OnChanges  {

  @Input() singlePlaceSlider;
  placeImages = [];
  isActive;
  imagesCount;

  constructor() {}

  ngOnInit() {
    this.isActive = 1;
    console.log('singlePlaceSlider');
    console.log(this.singlePlaceSlider);
    console.log('this.singlePlaceSlider.images.length')
    console.log(this.singlePlaceSlider.images.length)
    if (this.singlePlaceSlider.images.length === 0) {
      this.singlePlaceSlider.images.push(this.singlePlaceSlider.featured_image);
    // this.singlePlaceSlider.images.filter((images) => {
    //   console.log(images)
    // });
    }
  }
  ngOnChanges() { }

}
