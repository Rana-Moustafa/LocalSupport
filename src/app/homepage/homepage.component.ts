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
    this.places.updateFavPlacesList.subscribe(place => {
      this.updatedFavPlace = place;
      if (this.updatedFavPlace.is_favorited === true) {
        this.favoritePlacesSlider.unshift(this.updatedFavPlace);
      } else {
        // this.favoritePlacesSlider.pop(this.updatedFavPlace);
        for (let i = 0; i < this.favoritePlacesSlider.length; i++) {
          if (this.favoritePlacesSlider[i].id === this.updatedFavPlace.id) {
            this.favoritePlacesSlider.splice(i, 1);
            console.log(this.favoritePlacesSlider);
            if (this.favoritePlacesSlider.length < 1) {
              // this.favListEmpty = true;
            }
          }
        }
      }
    });
    this.commons.darkHeader = false;
    this.commons.currentscollAnchor.subscribe(message => this.scrollId = message);
    this.commons.show();
    // this.commons.showLoadingSpinner();
    // this.placesTypes();
    // this.getFavoritePlacesSlider();
    // this.getHomepageSections();

    this.translation.langUpdated.subscribe(
      (lang) => {

        
        localStorage.setItem('current_lang', lang);
        const currentLang = localStorage.getItem('current_lang');
        const translatedLang = lang;
        let u = this.router.url;
        u = u.replace(this.route.snapshot.params.language.toString(), lang);
        this.router.navigateByUrl(u);
       //  this.placesTypes();
        // this.getFavoritePlacesSlider();
        // this.getHomepageSections();
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
  getHomepageSections() {
    
    // this.commons.getHomePageData().subscribe(data => {
    //   this.commons.hideLoadingSpinner();
    //   console.log(data);
    //   this.homeData = data;
    //   for (var i = 0; i < this.homeData.length; i++) {
    //     if (this.homeData[i].acf_fc_layout === 'featured_place') {
    //       this.FaturedAddItems = this.homeData[i];
    //      // console.log(this.FaturedAddItems);
    //     }
    //     if (this.homeData[i].acf_fc_layout === 'testimonials') {
    //       this.testimonialsData = this.homeData[i].chosen_testimonials;

    //     }
    //     if (this.homeData[i].acf_fc_layout === 'who_are_we') {
    //       this.testWhoWeAre = this.homeData[i];
    //     }

    //   }
    //   this.featuredPlacesId = this.FaturedAddItems.featured_place;
    //   console.log(this.featuredPlacesId);
    //   this.GetFeaturedPlaces(this.featuredPlacesId);
    //   this.getTestimonialsData();
    //   this.navigateToSection(this.scrollId);
    //   if (this.scrollId) {
    //     this.navigateToSection(this.scrollId);
    //   }
    // }, error => {
    //   // console.log(error)
    //   this.commons.hideLoadingSpinner();
    // });
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
