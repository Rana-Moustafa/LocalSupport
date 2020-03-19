import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { CommonsService } from './../shared/commons.service';
import { FilterPipe } from '../shared/filter.pipe';
import { TranslationService } from '../shared/translation.service';


@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
  blogItamsNames;
  blogCount = 0;
  filterPipe: FilterPipe;
  isShow = true;
  isLoading = true;
  page = 1;
  perPage = 4;
  allBlogs = [];
  noBlogs = true;
  isFullListDisplayed = false;
  langURL = localStorage.getItem('current_lang');
  constructor(private commons: CommonsService,
              private translation: TranslationService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.commons.darkHeader = true;
    this.commons.showLoadingSpinner();
    this.blogItems(localStorage.getItem('current_lang'));

    this.router.navigateByUrl(this.router.url.replace(this.route.snapshot.params.language, localStorage.getItem('current_lang')));


    this.translation.langUpdated.subscribe(
      (lang) => {
        this.commons.showLoadingSpinner();
        // console.log(this.route.snapshot.params.language)
        // console.log(lang)
        const u = this.route.snapshot.params.language;
        const y = lang;
        this.router.navigateByUrl(this.router.url.replace(u, y));
        this.blogItems(lang);
      }
    );
  }

  blogItems(language) {
    this.noBlogs = true;
    this.commons.getBlogPageData(language, this.page, this.perPage).subscribe(data => {
        console.log(data);
        this.commons.hideLoadingSpinner();
        this.noBlogs = false;
        this.blogItamsNames = JSON.parse(JSON.stringify(data));
        if (this.blogItamsNames && this.blogItamsNames.length === 0 ) {
          console.log('no blogs to show');
          this.noBlogs = true;
          this.isFullListDisplayed = true;
        } else {
          this.page++;
          for (const blog of this.blogItamsNames) {
            this.allBlogs.push(this.blogItamsNames[blog]);
            break;
        }
          // for (var i = 0; i < this.blogItamsNames.length; i++) {
          //   this.allBlogs.push(this.blogItamsNames[i]);
          // }
        }

        this.blogCount = this.blogItamsNames.length;
        this.isLoading = false;
    }, error => {
        ////// console.log(error)
        this.noBlogs = false;
        this.isFullListDisplayed = true;
        this.commons.hideLoadingSpinner();
    });
  }
  onClick(isShow){
     if(isShow===true)
     this.isShow = true;
     else
     this.isShow=false;
     //console.log(this.isShow);
     
  }

  



}
