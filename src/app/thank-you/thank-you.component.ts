import { Component, OnInit } from '@angular/core';
import { CommonsService } from './../shared/commons.service';

@Component({
  selector: 'app-thank-you',
  templateUrl: './thank-you.component.html',
  styleUrls: ['./thank-you.component.scss']
})
export class ThankYouComponent implements OnInit {
  thankYouNames;
  langURL = localStorage.getItem('current_lang');
  constructor(private commons: CommonsService) { }

  ngOnInit() {
    this.commons.show();
  }
}
