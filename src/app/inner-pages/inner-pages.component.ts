import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonsService } from '../shared/commons.service';

@Component({
  selector: 'app-inner-pages',
  templateUrl: './inner-pages.component.html',
  styleUrls: ['./inner-pages.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class InnerPagesComponent implements OnInit {

  constructor(private commons : CommonsService) { }

  ngOnInit() {
    this.commons.show();
  }

}
