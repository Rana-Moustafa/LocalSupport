import { Component, OnInit } from '@angular/core';
import { CommonsService } from './../shared/commons.service';

@Component({
  selector: 'app-thank-you',
  templateUrl: './thank-you.component.html',
  styleUrls: ['./thank-you.component.scss']
})
export class ThankYouComponent implements OnInit {
  thankYouNames;
  constructor(private commons: CommonsService) { }

  ngOnInit() {
    this.ThankYouItems();
  }
  ThankYouItems(){
    this.commons.getThankYouData().subscribe(data => {
        // console.log(data)
        this.thankYouNames = data;
        // console.log('thank u',this.thankYouNames);
     }, error => {
        // console.log(error);
    });
  }
}
