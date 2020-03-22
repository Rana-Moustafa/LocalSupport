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
    this.commons.show();
  }
}
