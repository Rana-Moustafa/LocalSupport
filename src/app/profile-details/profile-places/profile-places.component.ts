import { Component, OnInit } from '@angular/core';
import { PlacesService } from 'src/app/shared/places.service';
import { TranslateService } from '@ngx-translate/core';
import { TranslationService } from '../../shared/translation.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile-places',
  templateUrl: './profile-places.component.html',
  styleUrls: ['./profile-places.component.scss']
})
export class ProfilePlacesComponent implements OnInit {
  userPlaces;
  langURL = localStorage.getItem('current_lang');
  constructor(private places: PlacesService,
              private translation: TranslationService,
              private translate: TranslateService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.getUserPlaces();

    this.translation.langUpdated.subscribe(
      (lang) => {
        localStorage.setItem('current_lang', lang);
        this.router.navigateByUrl(this.router.url.replace(this.route.snapshot.params.language,
          lang));
        this.getUserPlaces();
      }
    );
  }

  getUserPlaces() {
    this.places.userPlaces().subscribe( data => {
      //  (data);
      this.userPlaces = data;
    }, error => {
       (error);
    });
  }

}
