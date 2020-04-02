import { Component, OnInit } from '@angular/core';
import { CommonsService } from 'src/app/shared/commons.service';
import { TranslationService } from 'src/app/shared/translation.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.scss']
})
export class PrivacyComponent implements OnInit {
  privacyContent;
  constructor(
    private commons: CommonsService,
    private translation: TranslationService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.translation.langUpdated.subscribe(
      (lang) => {
        localStorage.setItem('current_lang', lang);
        this.router.navigateByUrl(this.router.url.replace(this.route.snapshot.params.language,
          lang));
      }
    );

    this.privacyData();
  }

  privacyData() {
    this.commons.getPrivacyPage().subscribe( data => {
      this.privacyContent = data;
    }, error => {
      console.log(error);
    });
  }
}
