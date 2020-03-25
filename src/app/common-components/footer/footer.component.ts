import { Component, OnInit, AfterViewChecked, ViewEncapsulation } from '@angular/core';
import { CommonsService } from '../../shared/commons.service';
import { PageScrollService } from 'ngx-page-scroll-core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FooterComponent implements OnInit, AfterViewChecked {

  footerData;
  socialMediaData;
  fragment;
  langURL = localStorage.getItem('current_lang');
  constructor(private commons: CommonsService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.fragment.subscribe(fragment => { this.fragment = fragment; });

    this.socialIcons();
  }
  ngAfterViewChecked(): void {
    try {
      if (this.fragment) {
        // document.querySelector('#' + this.fragment).scrollIntoView();
      }
    } catch (e) { }
  }
  socialIcons() {
    this.commons.getSocialIcons().subscribe(data => {
      // console.log(data);
      this.footerData = data;
      this.socialMediaData = this.footerData.social;
    }, error => {
      // console.log(error);
    });
  }
  navigateToNewsletter(section) {
    this.router.events.subscribe(s => {
      if (s instanceof NavigationEnd) {
        const tree = this.router.parseUrl(this.router.url);
        // if (tree.fragment) {
        const element = document.querySelector('#newsletter');
        if (element) {
          element.scrollIntoView();
        }
        // }
      }
    });
  }
}
