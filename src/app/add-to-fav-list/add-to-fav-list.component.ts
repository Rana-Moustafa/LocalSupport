import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PlacesService } from '../shared/places.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-to-fav-list',
  templateUrl: './add-to-fav-list.component.html',
  styleUrls: ['./add-to-fav-list.component.scss']
})
export class AddToFavListComponent implements OnInit {

  @Input() addToFavId;
  @Input() addToFavStatus;
  favPlaceData;
  notAdded;
  added;
  addedRemovedPlaceId;
  updatedFavPlace;
  nnn = false;

  @Output() updateFavListEvent = new EventEmitter();

  constructor(private places: PlacesService) { }

  ngOnInit() {
    this.places.updateFavPlacesList.subscribe(place => {
      this.updatedFavPlace = place;
      console.log(this.updatedFavPlace.is_favorited);
    });
  }

  addToFav(id) {
    console.log(id);
    console.log(this.addToFavStatus);

    if (this.addToFavStatus === false) {
      Swal.fire({
        title: 'Would you like to add the place to you favorite list?',
        text: 'You will be able to visit this list from your profile page.',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Yes, add it!',
        cancelButtonText: 'No, never mind'
      }).then((result) => {
        if (result.value) {
          this.addRemoveFavList(id, false);
          this.notAdded = false;
          this.addToFavStatus = true;
          Swal.fire(
            'Added!',
            'Congrats you are growing your favorites list.',
            'success'
          );
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          this.addToFavStatus = false;
          this.notAdded = true;
          console.log(this.addToFavStatus);
          Swal.fire(
            'Cancelled',
            'Your favoties list has not been changed',
            'info'
          );
        }
      });
    } else if (this.addToFavStatus === true) {
      Swal.fire({
        title: 'Are you sure you want to remove this place from your favorite list?',
        text: 'You will no longer be able to find this place in your profile page favorites!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, remove it!',
        cancelButtonText: 'No, never mind'
      }).then((result) => {
        if (result.value) {
          this.addRemoveFavList(id, true);
          this.added = false;
          this.addToFavStatus = false;
          Swal.fire(
            'Removed!',
            'Your favorites list has been updated.',
            'success'
          );
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          this.added = true;
          Swal.fire(
            'Cancelled',
            'Your favorites list has not been changed',
            'info'
          );
        }
      });
    }

  }
  addRemoveFavList(id, addORremove) {
    this.places.addToFavPlaces(id).subscribe(data => {
      console.log('fav');
      console.log(data);
      this.favPlaceData = JSON.parse(JSON.stringify(data));
      if (addORremove) {
          console.log('removed');
          if (this.favPlaceData.id === id) {
            this.addToFavStatus = false;
            console.log(this.favPlaceData.id);
            console.log(id);
          }
      } else {
        console.log('added');
      }
      this.addedRemovedPlaceId = id;
      // this.updateFavListEvent.emit(this.favPlaceData);
      this.places.updateFavPlaces(this.favPlaceData);
    }, error => {
      console.log(error);
    });
  }
}
