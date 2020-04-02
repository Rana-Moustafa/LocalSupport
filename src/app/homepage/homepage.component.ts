import { Component, OnInit } from '@angular/core';
import { CommonsService } from '../shared/commons.service';
import { PlacesService } from '../shared/places.service';
import { AuthenticationService } from '../shared/auth.service';
import { TranslationService } from '../shared/translation.service';
import { ActivatedRoute, Data, Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  FaturedAddItems;
  getPlaceId;
  featuredPlacesId;
  testimonialsData;
  testWhoWeAre;
  testimonialsIds = '';
  GetTestimonialsItem;
  homeData;
  placesCategories;
  favoritePlacesSlider;
  scrollId: string;
  updatedFavPlace;

  constructor(private commons: CommonsService,
              private places: PlacesService,
              private translation: TranslationService,
              private auth: AuthenticationService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.router.navigateByUrl(this.router.url.replace(this.route.snapshot.params.language, localStorage.getItem('current_lang')));
    this.commons.darkHeader = false;
    this.commons.currentscollAnchor.subscribe(message => this.scrollId = message);
    this.commons.show();
    this.translation.langUpdated.subscribe(
      (lang) => {
        localStorage.setItem('current_lang', lang);
        const currentLang = localStorage.getItem('current_lang');
        const translatedLang = lang;
        let u = this.router.url;
        u = u.replace(this.route.snapshot.params.language.toString(), lang);
        this.router.navigateByUrl(u);
      }
    );
  }
  navigateToSection(section: string) {
    this.route.fragment.subscribe(fragment => {
      setTimeout(() => {
        this.navigateToSection(section);
      }, 1000);
    });
  }

  GetFeaturedPlaces(featuredPlacesId) {
    this.places.getSinglePlaceData(featuredPlacesId).subscribe(data => {
      this.getPlaceId = data;
    }, error => {
      console.log(error);
    });
  }
  getTestimonialsData() {
    for (let i = 0; i < this.testimonialsData.length; i++) {
      this.testimonialsIds = this.testimonialsIds + '&include[' + i + ']=' + this.testimonialsData[i];
    }
    this.commons.getTestimonials(this.testimonialsIds).subscribe(data => {
      this.GetTestimonialsItem = data;
    }, error => {
      // console.log(error)
    });
  }

  placesTypes() {
    this.places.getPlacesTypes().subscribe(data => {
      this.placesCategories = data;
      this.placesCategories = this.placesCategories.reverse();

      console.log(this.placesCategories);
    }, error => {
      // console.log(error)
    });
  }
  getFavoritePlacesSlider() {
    if (this.auth.isLoggedIn()) {
      this.places.getFavoritePlaces(1, 100).subscribe(data => {
        this.favoritePlacesSlider = JSON.parse(JSON.stringify(data));
      }, error => {
        // console.log(error)
      });
    }

  }
}
