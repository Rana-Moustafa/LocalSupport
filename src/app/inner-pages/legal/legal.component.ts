import { Component, OnInit } from '@angular/core';
import { TranslationService } from 'src/app/shared/translation.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-legal',
  templateUrl: './legal.component.html',
  styleUrls: ['./legal.component.scss']
})
export class LegalComponent implements OnInit {

  constructor(
    private translation: TranslationService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.router.navigateByUrl(this.router.url.replace(this.route.snapshot.params.language,
      localStorage.getItem('current_lang')));
  }

}
