import { Component, OnInit, Input , OnChanges } from '@angular/core';


@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit, OnChanges  {

  @Input() singlePlaceSlider;
  isActive;
  imagesCount;

  constructor() {}

  ngOnInit() {
    this.isActive = 1;
    console.log('singlePlaceSlider');
    console.log(this.singlePlaceSlider)
  }
  ngOnChanges() { }

}
