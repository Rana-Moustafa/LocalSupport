import { Component, OnInit } from '@angular/core';
import { PlacesService } from '../../shared/places.service';
import { TranslationService } from '../../shared/translation.service';

@Component({
  selector: 'app-profile-favorites',
  templateUrl: './profile-favorites.component.html',
  styleUrls: ['./profile-favorites.component.scss']
})
export class ProfileFavoritesComponent implements OnInit {

  constructor(private favoritesPlacesservices: PlacesService,
              private translation: TranslationService) { }
  placesFavoritesList;
  placesTypeData;
  starRating = 0;
  favPlace;
  favListEmpty;
  page = 0;
  perPage = 10;
  isFullListDisplayed = false;
  allFavPlaces = []
  langURL = localStorage.getItem('current_lang');
  placeData;
  updatedFavPlace;

  ngOnInit() {

    // this.favoritesPlacesservices.updateFavPlacesList.subscribe(place => {
    //   this.updatedFavPlace = place;
    //   if (this.updatedFavPlace.is_favorited === true) {
    //     this.allFavPlaces.unshift(this.updatedFavPlace);
    //   } else {
    //     for (let i = 0; i < this.allFavPlaces.length; i++) {
    //       if (this.allFavPlaces[i].id === this.updatedFavPlace.id) {
    //         this.allFavPlaces.splice(i, 1);
    //         console.log(this.allFavPlaces);
    //         if (this.allFavPlaces.length < 1) {
    //           // this.favListEmpty = true;
    //         }
    //       }
    //     }
    //   }
    // });
   //  this.GetFavoritesList();

    this.translation.langUpdated.subscribe(
      (lang) => {
      //   this.GetFavoritesList();
      }
    );
  }

  removeFromUserFav(id) {

    this.favoritesPlacesservices.addToFavPlaces(id).subscribe(data => {
      console.log(id);
      console.log(data);
      this.favPlace = !this.favPlace;

      for (let i = 0; i < this.placesFavoritesList.length; i++) {
        if (this.placesFavoritesList[i].id === id) {
          this.allFavPlaces.splice(i, 1);
          console.log(this.placesFavoritesList);
          if (this.placesFavoritesList.length < 1) {
            this.favListEmpty = true;
          }
        }
      }
    }, error => {
    });
  }


  GetFavoritesList() {
    if (!this.isFullListDisplayed) {
      this.page++;
      this.favoritesPlacesservices.getFavoritePlaces(this.page, this.perPage).subscribe(data => {
        console.log(data)
        this.placesFavoritesList = JSON.parse(JSON.stringify(data));
        for (var i = 0; i < this.placesFavoritesList.length; i++) {
          this.allFavPlaces.push(this.placesFavoritesList[i]);
        }
        console.log(this.allFavPlaces);
        if (this.placesFavoritesList.length < 1) {
          this.favListEmpty = true;
        }
        if (this.placesFavoritesList && this.placesFavoritesList.length === 0) {
          this.isFullListDisplayed = true;
        }
      }, error => {
        // console.log(error)
        this.isFullListDisplayed = true;
      });
    }
  }

  updateFavList($event) {
      this.placeData = $event;
      console.log($event);
      for (let i = 0; i < this.allFavPlaces.length; i++) {
        if (this.allFavPlaces[i].id === this.placeData.id) {
          this.allFavPlaces.splice(i, 1);
          console.log(this.allFavPlaces);
          if (this.allFavPlaces.length < 1) {
             this.favListEmpty = true;
          }
        }
      }
  }
}
