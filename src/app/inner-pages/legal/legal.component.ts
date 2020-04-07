import { Component, OnInit } from '@angular/core';
import { TranslationService } from 'src/app/shared/translation.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonsService } from 'src/app/shared/commons.service';

@Component({
  selector: 'app-legal',
  templateUrl: './legal.component.html',
  styleUrls: ['./legal.component.scss']
})
export class LegalComponent implements OnInit {
  isLoading = true;
  constructor(
    private translation: TranslationService,
    private router: Router,
    private route: ActivatedRoute,
    private commons: CommonsService) { }

  ngOnInit() {
    this.commons.show();
    this.isLoading = false;
    this.router.navigateByUrl(this.router.url.replace(this.route.snapshot.params.language,
      localStorage.getItem('current_lang')));

    this.translation.langUpdated.subscribe(
      (lang) => {
        this.isLoading = false;
        this.router.navigateByUrl(this.router.url.replace(this.route.snapshot.params.language,
          lang));
      }
    );
  }

}
