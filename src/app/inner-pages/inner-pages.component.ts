import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonsService } from '../shared/commons.service';
import { TranslateService } from '@ngx-translate/core';
import { TranslationService } from '../shared/translation.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-inner-pages',
  templateUrl: './inner-pages.component.html',
  styleUrls: ['./inner-pages.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class InnerPagesComponent implements OnInit {

  constructor(private commons: CommonsService,
              public translate: TranslateService,
              private translation: TranslationService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.commons.show();
  }

}
