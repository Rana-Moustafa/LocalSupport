import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { BehaviorSubject, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  visible: boolean = true;
  currentUserLatitude;
  currentUserLongitude;
  latitude: number;
  longitude: number;
  zoom: number;
  pagee = 0;
  perpagee = 10;
  private addRemoveFromFavList = new Subject<any>();
  public updateFavPlacesList = new Subject<any>();
  // currentMessage = this.messageSource.asObservable();

  constructor(private http: HttpClient) {
    this.visible = true;
  }

  getCurrentLanguage() {
    return localStorage.getItem('current_lang');
  }


  updateFavPlaces(place) {
    this.updateFavPlacesList.next(place);
  }

  public getNewFavList() {
    return this.addRemoveFromFavList;
  }
  getFormSelections() {
    if (localStorage.getItem('current_lang') === 'de') {
      return this.http.get(environment.baseURL + '/wp-json/outdoorf/v1/form_selections');
    } else {
      return this.http.get(environment.baseURL + '/wp-json/outdoorf/v1/form_selections?lang=' + this.getCurrentLanguage());
    }
  }

  getCurrentUserLocation(latitude, longitude) {
    this.currentUserLatitude = latitude;
    this.currentUserLongitude = longitude;
  }
  getSinglePlaceData(id: number) {
    if (localStorage.getItem('current_lang') === 'de') {
      return this.http.get(environment.baseURL + '/wp-json/wp/v2/place/' + id + '?token='
        + JSON.parse(localStorage.getItem('token')) + '&skip_cache=1');
    } else {
      return this.http.get(environment.baseURL + '/wp-json/wp/v2/place/' + id + '?token='
        + JSON.parse(localStorage.getItem('token')) + '&skip_cache=1&lang=' + this.getCurrentLanguage());
    }
  }
  getPlacesItems() {
    if (localStorage.getItem('current_lang') === 'en') {
      return this.http.get(environment.baseURL + '/wp-json/wp/v2/place?lang=en');
    } else {
      return this.http.get(environment.baseURL + '/wp-json/wp/v2/place');
    }
  }
  getPlacesTypess(lang) {
    if (lang === 'de') {
      return this.http.get(environment.baseURL + '/wp-json/outdoorf/v1/place_types');
    } else {
      return this.http.get(environment.baseURL + '/wp-json/outdoorf/v1/place_types?lang=' + lang);
    }
  }

  getPlacesTypes() {
    if (localStorage.getItem('current_lang') === 'de') {
      return this.http.get(environment.baseURL + '/wp-json/outdoorf/v1/place_types');
    } else {
      return this.http.get(environment.baseURL + '/wp-json/outdoorf/v1/place_types?lang=' + this.getCurrentLanguage());
    }
  }

  // Get Current Location Coordinates
  getCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 15;
      });
    }
  }

  getPlaceRoute(id) {
    return this.http.get(environment.baseURL + '/wp-json/outdoorf/v1/place_location?id=' + id +
      '&lat=' + this.latitude + '&lng=' + this.longitude);
  }

  addComment(id, comment, rating) {
    let commentData: FormData = new FormData();
    commentData.append('post', id);
    commentData.append('content', comment);
    commentData.append('rating', rating);
    commentData.append('token', JSON.parse(localStorage.getItem('token')));
    commentData.append('token_type', JSON.parse(localStorage.getItem('token_type')));

    if (localStorage.getItem('current_lang') === 'en') {
      return this.http.post(environment.baseURL + '/wp-json/wp/v2/comments?core&lang=en',
        commentData );
    } else {
      return this.http.post(environment.baseURL + '/wp-json/wp/v2/comments?core',
        commentData );
    }

  }

  getPlaceParentComments(postId, page, sum) {
    const token = localStorage.getItem('token');
    if (localStorage.getItem('current_lang') === 'en') {
      return this.http.get(environment.baseURL + '/wp-json/wp/v2/comments?parent=0&post=' + postId
      + '&per_page=' + sum + '&page=' + page + '&token=' + JSON.parse(localStorage.getItem('token')) + '&lang=en');
    } else {
      return this.http.get(environment.baseURL + '/wp-json/wp/v2/comments?parent=0&post=' + postId
      + '&per_page=' + sum + '&page=' + page + '&token=' + JSON.parse(localStorage.getItem('token')));
    }
  }

  getPlaceReplies(postId, parentId) {
    if (localStorage.getItem('current_lang') === 'en') {
      return this.http.get(environment.baseURL + '/wp-json/wp/v2/comments?parent=' + parentId + '&post=' + postId + '&lang=en');
    } else {
      return this.http.get(environment.baseURL + '/wp-json/wp/v2/comments?parent=' + parentId + '&post=' + postId);
    }
  }

  getFavoritePlaces(page, perpage) {
    if (localStorage.getItem('current_lang') === 'en') {
      return this.http.get(environment.baseURL + '/wp-json/wp/v2/place?core&lang=en&favorite&skip_cache=1' +
      '&token=' + JSON.parse(localStorage.getItem('token')) + '&page=' + page + '&per_page=' + perpage );
    } else {
      return this.http.get(environment.baseURL + '/wp-json/wp/v2/place?core&favorite&skip_cache=1' +
      '&token=' + JSON.parse(localStorage.getItem('token')) + '&page=' + page + '&per_page=' + perpage );
    }
  }

  getUserComments() {
    if (localStorage.getItem('current_lang') === 'en') {
      return this.http.get(environment.baseURL + '/wp-json/wp/v2/comments?author=' + localStorage.getItem('id') + '&lang=en');
    } else {
      return this.http.get(environment.baseURL + '/wp-json/wp/v2/comments?author=' + localStorage.getItem('id'));
    }
  }

  getUserFavoritePlaces() {
    if (localStorage.getItem('current_lang') === 'en') {
      return this.http.get(environment.baseURL + '/wp-json/wp/v2/place?core&lang=en&favorite&author=' +
      JSON.parse(localStorage.getItem('id')));
    } else {
      return this.http.get(environment.baseURL + '/wp-json/wp/v2/place?core&favorite&author=' + JSON.parse(localStorage.getItem('id')))
    }
  }
  getRelatedPlaces(placeId) {

    if (localStorage.getItem('current_lang') === 'en') {
      return this.http.get(environment.baseURL + '/wp-json/wp/v2/place?core' + placeId + '&lang=en');
    } else {
      return this.http.get(environment.baseURL + '/wp-json/wp/v2/place?core' + placeId);
    }

  }


  addToFavPlaces(id) {
    let favPlacesData: FormData = new FormData();
    favPlacesData.append('token', JSON.parse(localStorage.getItem('token')));
    favPlacesData.append('place_id', id);
    if (localStorage.getItem('current_lang') === 'en') {
      return this.http.post(environment.baseURL + '/wp-json/outdoorf/v1/favorite?lang=en',
        favPlacesData
      );
    } else {
      return this.http.post(environment.baseURL + '/wp-json/outdoorf/v1/favorite',
        favPlacesData
      );
    }

  }

  addNewPlace(
    place,
    featured,
    placeName,
    selectedType,
    selectedCategories,
    selectedDelivery,
    selectedPaymentMethod,
    imagesNames,
    imagesUrls,
    latitude,
    longitude,
    minValue,
    maxValue) {

    let address;
    if (placeName.length < 1) {
      address = place.address;
    } else {
      address = placeName[0];
    }

    let placeData: FormData = new FormData();
    for (var j = 0; j < imagesNames.length; j++) {
      placeData.append('other_images[' + j + '][name]', imagesNames[j].split('.').slice(0, -1).join('.'));
      placeData.append('other_images[' + j + '][image]', imagesUrls[j]);
    }
    for (var i = 0; i < selectedCategories.length; i++) {
      placeData.append('category[' + i + ']', (selectedCategories[i].key).toString());
    }
    for (var n = 0; n < selectedDelivery.length; n++) {
      placeData.append('delivery[' + n + ']', (selectedDelivery[n].key).toString());
    }
    for (var l = 0; l < selectedPaymentMethod.length; l++) {
      placeData.append('payment_methods[' + l + ']', (selectedPaymentMethod[l].key).toString());
    }


    placeData.append('token', JSON.parse(localStorage.getItem('token')));
    placeData.append('feat_image_name', featured[0] ? featured[0] : '');
    placeData.append('feat_image', featured[1] ? featured[1] : '');
    placeData.append('name', place.placename);
    placeData.append('address', address);
    placeData.append('number', '');
    placeData.append('email', (place.placeemail).toString());
    placeData.append('zipcode', (place.zipcode).toString());
    placeData.append('website', (place.website).toString());
    placeData.append('description', place.description);
    placeData.append('phone_number', (place.phone).toString());
    placeData.append('type', place.subcats.key);
    placeData.append('hr_from', (place.openFrom).toString());
    placeData.append('hr_to', (place.openTo).toString());
    placeData.append('lat', latitude);
    placeData.append('lng', longitude);
    // placeData.forEach((value, key) => {
    //   console.log(key + ' ' + value);
    // });
    return this.http.post(environment.baseURL + '/wp-json/outdoorf/v1/add_place',
      placeData);

  }

  getPlacesCategories(id, sortBy, page, perpage) {
    // console.log(environment.baseURL + '/wp-json/wp/v2/place?core&place_type=' + id +
    //   '&page=' + page + '&per_page=' + perpage + '&' + sortBy + '&lang=' + localStorage.getItem('current_lang'));
    if (localStorage.getItem('current_lang') === 'de') {
      return this.http.get(environment.baseURL + '/wp-json/wp/v2/place?core&place_type=' + id +
      '&page=' + page + '&per_page=' + perpage + '&' + sortBy);
    } else {
      return this.http.get(environment.baseURL + '/wp-json/wp/v2/place?core&place_type=' + id +
      '&page=' + page + '&per_page=' + perpage + '&' + sortBy + '&lang=' + localStorage.getItem('current_lang'));
    }
  }

  filteredPlaces(filterObj, page, perpage) {
    let filterCategories = '';
    let filterDelivery = '';
    let filterPayment = '';
    let filterTypes = '';

    console.log(filterObj);

    if (filterObj && filterObj.selectedPayment.length > 0) {
      for (var i = 0; i < filterObj.selectedPayment.length; i++) {
        if (filterObj.selectedPayment) {
          filterPayment = filterPayment + '&payment_methods[' + i + ']=' + filterObj.selectedPayment[i].key;
        } else {
          filterPayment = '';
        }
      }
    }


    if (filterObj && filterObj.selectedDelivery.length > 0) {
      for (var i = 0; i < filterObj.selectedDelivery.length; i++) {
        if (filterObj.selectedDelivery) {
          filterDelivery = filterDelivery + '&deliver[' + i + ']=' + filterObj.selectedDelivery[i].key;
        } else {
          filterDelivery = '';
        }
      }
    }
    if (filterObj && filterObj.selectedCategory.length > 0) {
      for (var j = 0; j < filterObj.selectedCategory.length; j++) {
        if (filterObj.selectedCategory) {
          filterCategories = filterCategories + '&category[' + j + ']=' + filterObj.selectedCategory[j].key;
        } else {
          filterDelivery = '';
        }
      }
    }

    if (filterObj && JSON.stringify(filterObj.selectedTypes).length > 0) {
      filterTypes = '&type=' + filterObj.selectedTypes;
    } else {
      filterTypes = '';
    }

    if (localStorage.getItem('current_lang') === 'de') {
      return this.http.get(environment.baseURL + '/wp-json/wp/v2/place?core&' + filterPayment +
      filterDelivery + filterCategories + filterTypes + '&skip_cache=1&page=' + page + '&per_page=' + perpage);
    } else {
      console.log(environment.baseURL + '/wp-json/wp/v2/place?core&' + filterPayment +
      filterDelivery + filterCategories + filterTypes + '&skip_cache=1&page=' + page + '&per_page=' + perpage +
      '&lang=' + localStorage.getItem('current_lang'));
      return this.http.get(environment.baseURL + '/wp-json/wp/v2/place?core&' + filterPayment +
      filterDelivery + filterCategories + filterTypes + '&skip_cache=1&page=' + page + '&per_page=' + perpage +
      '&lang=' + localStorage.getItem('current_lang'));
    }
  }

  sortPlaces(sortBy, placeId) {
    if (localStorage.getItem('current_lang') === 'en') {
      return this.http.get(environment.baseURL + '/wp-json/wp/v2/place?core&place_type=' + placeId + sortBy + '&skip_cache=1&lang=en')
    } else {
      return this.http.get(environment.baseURL + '/wp-json/wp/v2/place?core&place_type=' + placeId + sortBy + '&skip_cache=1',
        { observe: 'response' });
    }

  }


  editSelectedPlace(
    place,
    placeImages,
    placeFeaturedImage,
    placeName,
    selectedType,
    selectedCategories,
    selectedDelivery,
    selectedPaymentMethod,
    latitude,
    longitude,
    placeId) {

    let address;
    if (placeName && placeName.length < 1) {
      address = place.address;
    } else {
      address = placeName[0];
    }

    let placeData: FormData = new FormData();

    for (var j = 0; j < placeImages.length; j++) {
      placeData.append('other_images[' + j + '][name]', placeImages[j].name);
      placeData.append('other_images[' + j + '][image]', placeImages[j].url);
    }

    if (selectedCategories) {
      for (var i = 0; i < selectedCategories.length; i++) {
        placeData.append('category[' + i + ']', selectedCategories[i].key);
      }
    }
    if (selectedDelivery) {
      for (var n = 0; n < selectedDelivery.length; n++) {
        placeData.append('delivery[' + n + ']', selectedDelivery[n].key);
      }
    }
    if (selectedPaymentMethod) {
      for (var l = 0; l < selectedPaymentMethod.length; l++) {
        placeData.append('payment_methods[' + l + ']', selectedPaymentMethod[l].key);
      }
    }

    if (placeFeaturedImage && placeFeaturedImage[0].url && placeFeaturedImage[0].url.length > 0) {
      placeData.append('feat_image_name', placeFeaturedImage[0].name);
      placeData.append('feat_image', placeFeaturedImage[0].url);
    } else {
      // console.log(placeFeaturedImage.length);
    }

    placeData.append('token', JSON.parse(localStorage.getItem('token')));
    placeData.append('name', place.placename);
    placeData.append('address', address);
    placeData.append('number', '');
    placeData.append('email', (place.placeemail).toString());
    placeData.append('zipcode', (place.zipcode).toString());
    placeData.append('website', (place.website).toString());
    placeData.append('description', place.description);
    placeData.append('phone_number', (place.phone).toString());
    placeData.append('type', selectedType);
    placeData.append('hr_from', (place.openFrom));
    placeData.append('hr_to', (place.openTo));
    placeData.append('lat', latitude);
    placeData.append('lng', longitude);
    placeData.append('lat', latitude);
    placeData.append('lng', longitude);
    placeData.append('place_id', placeId);
    placeData.append('edit_image', 'true');
    // placeData.forEach((value, key) => {
    //   console.log(key + ' ' + value);
    // });

    return this.http.post(environment.baseURL + '/wp-json/outdoorf/v1/edit_place',
      placeData);
  }

  userPlaces() {
    if (localStorage.getItem('current_lang') === 'en') {
      return this.http.get(environment.baseURL + '/wp-json/wp/v2/place/?myplaces&core&lang=en&token=' +
        JSON.parse(localStorage.getItem('token')));
    } else {
      return this.http.get(environment.baseURL + '/wp-json/wp/v2/place/?myplaces&core&token=' +
        JSON.parse(localStorage.getItem('token')));
    }
  }
}
