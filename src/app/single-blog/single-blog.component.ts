import { Component, OnInit, ViewChild, Input, Pipe, PipeTransform, ViewEncapsulation, OnDestroy } from '@angular/core';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { BlogService } from '../shared/blog.service';
import { UserDataService } from '../shared/user-data.service';
import { UserStatusService } from '../shared/user-status.service';
import { TranslationService } from '../shared/translation.service';
import { CommonsService } from '../shared/commons.service';


@Component({
  selector: 'app-single-blog',
  templateUrl: './single-blog.component.html',
  styleUrls: ['./single-blog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SingleBlogComponent implements OnInit, OnDestroy {

  arrow;
  isShow = true;
  authorInfo;
  authorInfoAvatar;
  noAuthorInfoAvatar = false;

  currentURL;
  endurl;

  blogItem: any = [];
  translatedId;
  placeNotTranslated = false;
  public sliderOPT: any = {
    nav: true, dots: false, loop: true, autoPlay: true, autoPlayTimeout: 5000, autoplayHoverPause: true, items: 4,
    // navText: this.arrow,
    responsiveClass: true,
    navClass: ['owl-prev left', 'owl-next'],
    navText: ['<div class="nav-btn prev-slide"><i class="fa fa-angle-left" aria-hidden="true"></i></div>',
      '<div class="nav-btn next-slide"><i class="fa fa-angle-right" aria-hidden="true"></i></div>'],
    responsive: {
      0: {
        items: 1,
        nav: true,
      },
      1200: {
        items: 1,
        nav: true,
      }
    }

  };

  constructor(private blogService: BlogService,
              private route: ActivatedRoute,
              private userData: UserDataService,
              private userStatus: UserStatusService,
              private translations: TranslationService,
              private router: Router,
              private commons: CommonsService) {
    this.endurl = this.route.snapshot.routeConfig.path;
    this.currentURL = location.origin;
    console.log(this.endurl);
  }
  ngOnInit() {
    this.commons.darkHeader = true;
    this.commons.showLoadingSpinner();
    this.router.navigateByUrl(this.router.url.replace(this.route.snapshot.params.language, localStorage.getItem('current_lang')));

    this.translations.addRouterLangParam();
    this.getSingleBlog(this.route.snapshot.params['id']);
    if (!this.translatedId) {
      // this.commons.sendLanguageSwitcherStatus(true);
      this.commons.changeLanguageSwitcherStatus(true);
    } else {
      // this.commons.sendLanguageSwitcherStatus(false);
      this.commons.changeLanguageSwitcherStatus(false);
    }
    this.translations.langUpdated.subscribe(
      (lang) => {
        this.commons.showLoadingSpinner();
        const currentLang = localStorage.getItem('current_lang');
        const translatedLang = lang;
        let u = this.router.url;
        u = u.replace(currentLang, translatedLang);
        if (this.translatedId) {
          u = u.replace(this.route.snapshot.params.id.toString(), this.translatedId.toString());
          this.router.navigateByUrl(u);
          this.getSingleBlog(this.translatedId);
        } else {
          this.placeNotTranslated = true;
          this.router.navigateByUrl(u);
        }

      }
    );
  }

  getSingleBlog(blogid) {
    this.blogService.getSingleBlogDetails(blogid).subscribe(data => {
      this.blogItem = data;
      // console.log(this.blogItem);
      this.commons.hideLoadingSpinner();
      this.translatedId = this.blogItem.translated_id;
      // console.log(data)
      // this.blogItem = JSON.stringify(data);
      this.authorData(this.blogItem.author);
    }, error => {
      // console.log(error);
      this.commons.hideLoadingSpinner();
    });
  }

  authorData(authorId) {
    this.userData.getAutherData(authorId).subscribe(data => {
      this.authorInfo = JSON.parse(JSON.stringify(data));
      this.noAuthorInfoAvatar = false;
      this.authorInfoAvatar = this.authorInfo.avatar_urls['96'];

      // console.log(this.authorInfo.avatar_urls['96']);
    }, error => {
      // console.log(error);
      this.noAuthorInfoAvatar = true;
    });
  }

  ngOnDestroy() {
    this.commons.changeLanguageSwitcherStatus(false);
  }
}
