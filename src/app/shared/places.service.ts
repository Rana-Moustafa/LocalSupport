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
  updateFavPlaces(place) {
    this.updateFavPlacesList.next(place);
  }

  public getNewFavList() {
    return this.addRemoveFromFavList;
  }
  getFormSelections() {
    if (localStorage.getItem('current_lang') === 'en') {
      return this.http.get('https://belocalhero.cyon.site/stawp/wp-json/outdoorf/v1/form_selections?lang=en');
    } else {
      return this.http.get('https://belocalhero.cyon.site/stawp/wp-json/outdoorf/v1/form_selections');
    }
  }

  getCurrentUserLocation(latitude, longitude) {
    this.currentUserLatitude = latitude;
    this.currentUserLongitude = longitude;
  }
  getSinglePlaceData(id: number) {
    if (localStorage.getItem('current_lang') === 'en') {
      return this.http.get(environment.baseURL + '/wp-json/wp/v2/place/' + id + '?token=' + JSON.parse(localStorage.getItem('token')) + '&lang=en');
    }
    else {
      return this.http.get(environment.baseURL + '/wp-json/wp/v2/place/' + id + '?token=' + JSON.parse(localStorage.getItem('token')));

    }
  }
  getPlacesItems() {
    if (localStorage.getItem('current_lang') === 'en') {
      return this.http.get(environment.baseURL + '/wp-json/wp/v2/place?lang=en');
    }
    else {
      return this.http.get(environment.baseURL + '/wp-json/wp/v2/place');
    }
  }
  getPlacesTypess(lang) {
    if (lang === 'en') {
      return this.http.get(environment.baseURL + '/wp-json/outdoorf/v1/place_types?lang=en');
    }
    else {
      return this.http.get(environment.baseURL + '/wp-json/outdoorf/v1/place_types');
    }
  }

  getPlacesTypes() {
    if (localStorage.getItem('current_lang') === 'en') {
      return this.http.get(environment.baseURL + '/wp-json/outdoorf/v1/place_types?lang=en');
    }
    else {
      return this.http.get(environment.baseURL + '/wp-json/outdoorf/v1/place_types');
    }
  }

  // Get Current Location Coordinates
  getCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 15;
        //////console.log(this.latitude + '' + this.longitude)
      });
    }
  }

  getPlaceRoute(id) {
    return this.http.get(environment.baseURL + '/wp-json/outdoorf/v1/place_location?id=' + id + '&lat=' + this.latitude + '&lng=' + this.longitude)
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
        commentData
      )
    }
    else {
      return this.http.post(environment.baseURL + '/wp-json/wp/v2/comments?core',
        commentData
      )
    }

  }

  getPlaceParentComments(postId, page, sum) {
    const token = localStorage.getItem('token');
    if (localStorage.getItem('current_lang') === 'en') {
      return this.http.get(environment.baseURL + '/wp-json/wp/v2/comments?parent=0&post=' + postId + '&per_page=' + sum + '&page=' + page + '&token=' + JSON.parse(localStorage.getItem('token')) + '&lang=en');
    }
    else {
      return this.http.get(environment.baseURL + '/wp-json/wp/v2/comments?parent=0&post=' + postId + '&per_page=' + sum + '&page=' + page + '&token=' + JSON.parse(localStorage.getItem('token')));
    }
  }

  getPlaceReplies(postId, parentId) {
    if (localStorage.getItem('current_lang') === 'en') {
      return this.http.get(environment.baseURL + '/wp-json/wp/v2/comments?parent=' + parentId + '&post=' + postId + '&lang=en');
    }
    else {
      return this.http.get(environment.baseURL + '/wp-json/wp/v2/comments?parent=' + parentId + '&post=' + postId);
    }

  }

  getFavoritePlaces(page, perpage) {
    if (localStorage.getItem('current_lang') === 'en') {
      return this.http.get(environment.baseURL + '/wp-json/wp/v2/place?core&lang=en&favorite&skip_cache=1' + '&token=' + JSON.parse(localStorage.getItem('token')) + '&page=' + page + '&per_page=' + perpage)
    }
    else {
      return this.http.get(environment.baseURL + '/wp-json/wp/v2/place?core&favorite&skip_cache=1' + '&token=' + JSON.parse(localStorage.getItem('token')) + '&page=' + page + '&per_page=' + perpage)

    }

  }

  getUserComments() {

    if (localStorage.getItem('current_lang') === 'en') {
      return this.http.get(environment.baseURL + '/wp-json/wp/v2/comments?author=' + localStorage.getItem('id') + '&lang=en')
    }
    else {
      return this.http.get(environment.baseURL + '/wp-json/wp/v2/comments?author=' + localStorage.getItem('id'))
    }

  }

  getUserFavoritePlaces() {
    if (localStorage.getItem('current_lang') === 'en') {
      return this.http.get(environment.baseURL + '/wp-json/wp/v2/place?core&lang=en&favorite&author=' + JSON.parse(localStorage.getItem('id')))
    }
    else {
      return this.http.get(environment.baseURL + '/wp-json/wp/v2/place?core&favorite&author=' + JSON.parse(localStorage.getItem('id')))
    }
  }
  getRelatedPlaces(placeId) {

    if (localStorage.getItem('current_lang') === 'en') {
      return this.http.get(environment.baseURL + '/wp-json/wp/v2/place?core' + placeId + '&lang=en');
    }
    else {
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
      )
    }
    else {
      return this.http.post(environment.baseURL + '/wp-json/outdoorf/v1/favorite',
        favPlacesData
      )
    }

  }

  addNewPlace(place,
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

    // //console.log(place)
   
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
      placeData.append('category[' + i + ']', (selectedCategories[i].name).toString());
    }
    for (var n = 0; n < selectedDelivery.length; n++) {
      placeData.append('delivery[]', (selectedDelivery[n].name).toString())
    }
    for (var l = 0; l < selectedPaymentMethod.length; l++) {
      placeData.append('payment_methods[]', (selectedPaymentMethod[l].name).toString())
    }


    placeData.append('token', JSON.parse(localStorage.getItem('token')));
    placeData.append('token_type', JSON.parse(localStorage.getItem('token_type')));
    placeData.append('feat_image_name', featured[0]);
    placeData.append('feat_image', featured[1]);
    placeData.append('name', place.placename);
    placeData.append('address', address);
    placeData.append('number', '');
    placeData.append('email', (place.placeemail).toString());
    placeData.append('zipcode', (place.zipcode).toString());
    placeData.append('website', (place.website).toString());
    placeData.append('description', place.description);
    placeData.append('phone_number', (place.phone).toString());
    placeData.append('type', (place.subcats ? place.subcats.name : null));
    placeData.append('hr_from', (place.openFrom).toString());
    placeData.append('hr_to', (place.openTo).toString());
    placeData.append('lat', latitude);
    placeData.append('lng', longitude);
    placeData.append('lat', latitude);
    placeData.append('lng', longitude);
    console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
    placeData.forEach((value, key) => {
      console.log(key + ' ' + value);
    });
    if (localStorage.getItem('current_lang') === 'en') {
      // return 'english'
      return this.http.post('https://belocalhero.cyon.site/stawp/wp-json/outdoorf/v1/add_place?lang=en',
        placeData);
    } else {
      // return 'german'
      return this.http.post('https://belocalhero.cyon.site/stawp/wp-json/outdoorf/v1/add_place',
        placeData);
    }

  }

  getPlacesCategories(id, sortBy, page, perpage) {
    if (localStorage.getItem('current_lang') === 'en') {
      console.log(environment.baseURL + '/wp-json/wp/v2/place?core&place_type=' + id + '&lang=en&page=' + page + '&per_page=' + perpage + '&' + sortBy + '&token=' + localStorage.getItem('token'))
      return this.http.get(environment.baseURL + '/wp-json/wp/v2/place?core&place_type=' + id + '&lang=en&page=' + page + '&per_page=' + perpage + '&' + sortBy + '&token=' + JSON.parse(localStorage.getItem('token')))
    }
    else {
      console.log(environment.baseURL + '/wp-json/wp/v2/place?core&place_type=' + id + '&page=' + page + '&per_page=' + perpage + '&' + sortBy + '&token=' + localStorage.getItem('token'))
      return this.http.get(environment.baseURL + '/wp-json/wp/v2/place?core&place_type=' + id + '&page=' + page + '&per_page=' + perpage + '&' + sortBy + '&token=' + JSON.parse(localStorage.getItem('token')))

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
          filterPayment = filterPayment + '&payment_methods[' + i + ']=' + filterObj.selectedPayment[i].name;
        } else {
          filterPayment = '';
        }
      }
    }


    if (filterObj  && filterObj.selectedDelivery.length > 0) {
      for (var i = 0; i < filterObj.selectedDelivery.length; i++) {
        if (filterObj.selectedDelivery) {
          filterDelivery = filterDelivery + '&deliver[' + i + ']=' + filterObj.selectedDelivery[i].name;
        } else {
          filterDelivery = '';
        }
      }
    }
    if (filterObj && filterObj.selectedCategory.length > 0) {
      for (var j = 0; j < filterObj.selectedCategory.length; j++) {
        if (filterObj.selectedCategory) {
          filterCategories = filterCategories + '&category[' + j + ']=' + filterObj.selectedCategory[j].name;
        } else {
          filterDelivery = '';
        }
      } 
    }

    if (filterObj && filterObj.selectedTypes) {
      filterTypes = '&type=' + filterObj.selectedTypes;
    } else {
      filterTypes = '';
    }


    if (localStorage.getItem('current_lang') === 'en') {
      return this.http.get(environment.baseURL + '/wp-json/wp/v2/place?core&lat&lng&' 
      + filterPayment + filterDelivery + filterCategories + filterTypes + '&skip_cache=1&lang=en&page=' + page + '&per_page='+ perpage);
    } else {
      console.log(environment.baseURL + '/wp-json/wp/v2/place?core&lat&lng' + 
      filterPayment +filterDelivery + filterCategories + filterTypes  + '&skip_cache=1')
      return this.http.get(environment.baseURL + '/wp-json/wp/v2/place?core&lat&lng&' + filterPayment +filterDelivery +filterCategories + filterTypes + '&skip_cache=1&page=' + page + '&per_page='+ perpage);
    }
  }

  filterPlaces(filterObj) {
    this.pagee++;
    let filterAccessible = '';
    let filterAccessibleBy = '';
    let filterFood = '';
    let filterFeature = '';
    let filterActivities = '';
    let filterCategories = '';
    let filterRating;
    let filterMaxvalue;
    let filterMinvalue;
    let filterDistance;
    let filterSize;
    console.log(filterObj);

    if (filterObj.size.length > 0) {
      for (var i = 0; i < filterObj.size.length; i++) {
        if (filterObj.size) {
          filterSize = filterSize + '&size[' + i + ']=' + filterObj.size[i].name;
        } else {
          filterSize = '';
        }
      }
    }


    if (filterObj.acescsible_by.length > 0) {
      for (var i = 0; i < filterObj.acescsible_by.length; i++) {
        if (filterObj.acescsible_by) {
          filterAccessibleBy = filterAccessibleBy + '&accessible_by[' + i + ']=' + filterObj.acescsible_by[i].name;
        } else {
          filterAccessibleBy = '';
        }
      }
    }
    if (filterObj.accessablity.length > 0) {
      for (var j = 0; j < filterObj.accessablity.length; j++) {
        if (filterObj.accessablity) {
          filterAccessible = filterAccessible + '&accessibility[' + j + ']=' + filterObj.accessablity[j].name;
        } else {
          filterAccessible = ''
        }
      }
    }
    if (filterObj.selectedFood.length > 0) {
      for (var l = 0; l < filterObj.selectedFood.length; l++) {
        if (filterObj.selectedFood) {
          filterFood = filterFood + '&food[' + l + ']=' + filterObj.selectedFood[l].name;
        } else {
          filterFood = '';
        }
      }
    }
    if (filterObj.selectedFeatures.length > 0) {
      for (var m = 0; m < filterObj.selectedFeatures.length; m++) {
        if (filterObj.selectedFeatures) {
          filterFeature = filterFeature + '&features[' + m + ']=' + filterObj.selectedFeatures[m].name;
        } else {
          filterFeature = ''
        }
      }
    }


    if (filterObj.selectedCategory.length > 0) {

      for (var o = 0; o < filterObj.selectedCategory.length; o++) {
        if (filterObj.selectedCategory) {
          filterCategories = filterCategories + '&place_type[' + o + ']=' + filterObj.selectedCategory[o].id;
        } else {
          filterCategories = '';
        }
      }
    }
    // if (filterObj.size == undefined) {
    //   filterSize = filterObj.size = ''
    // } else {
    //   filterSize = '&size=' + filterObj.size;
    // }
    if (filterObj && filterObj.rating_filter == undefined) {
      filterRating = '&rating_filter=' + (filterObj.rating_filter = 0);
    } else {
      filterRating = '&rating_filter=' + filterObj.rating_filter;
    }
    if (filterObj && filterObj.distance == undefined) {
      filterDistance = filterObj.distance = 0
    } else {
      filterDistance = '&distance=' + filterObj.distance;
    }
    if (filterObj && filterObj.minValue == undefined) {
      filterMinvalue = filterObj.minValue = 0
    } else {
      filterMinvalue = '&min_price=' + filterObj.minValue;
    }
    if (filterObj.maxValue == undefined) {
      filterMaxvalue = filterObj.maxValue = 10000;
    } else {
      filterMaxvalue = '&max_price=' + filterObj.maxValue;
    }



    if (localStorage.getItem('current_lang') === 'en') {
      return this.http.get(environment.baseURL + '/wp-json/wp/v2/place?core&lat&lng&' + filterSize +
        filterAccessibleBy + filterAccessible + filterFood + filterFeature + filterActivities +
        filterDistance + filterRating + filterCategories + filterMinvalue + filterMaxvalue + '&skip_cache=1&lang=en&page=' + '1' + '&per_page=100');
    }
    else {
      console.log(environment.baseURL + '/wp-json/wp/v2/place?core&lat&lng' + filterSize +
        filterAccessibleBy + filterAccessible + filterFood + filterFeature + filterActivities +
        filterDistance + filterRating + filterCategories + filterMinvalue + filterMaxvalue + '&skip_cache=1')
      return this.http.get(environment.baseURL + '/wp-json/wp/v2/place?core&lat&lng&' + filterSize +
        filterAccessibleBy + filterAccessible + filterFood + filterFeature + filterActivities +
        filterDistance + filterRating + filterCategories + filterMinvalue + filterMaxvalue + '&skip_cache=1&page=' + '1' + '&per_page=100');
    }
  }

  sortPlaces(sortBy, placeId) {
    if (localStorage.getItem('current_lang') === 'en') {
      return this.http.get(environment.baseURL + '/wp-json/wp/v2/place?core&place_type=' + placeId + sortBy + '&skip_cache=1&lang=en')
    } else {
      console.log(environment.baseURL + '/wp-json/wp/v2/place?core&place_type=' + placeId + sortBy + '&skip_cache=1');
      return this.http.get(environment.baseURL + '/wp-json/wp/v2/place?core&place_type=' + placeId + sortBy + '&skip_cache=1',
        { observe: 'response' });
    }

  }


  editSelectedPlace(place,
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

    if (selectedCategories) {
      for (var i = 0; i < selectedCategories.length; i++) {
        placeData.append('category[' + i + ']', (selectedCategories[i].name).toString());
      }
    }
    if (selectedDelivery) {
      for (var n = 0; n < selectedDelivery.length; n++) {
        placeData.append('delivery[' + n + ']', (selectedDelivery[n].name).toString());
      }
    }
    if (selectedPaymentMethod) {
      for (var l = 0; l < selectedPaymentMethod.length; l++) {
        placeData.append('payment_methods[' + l + ']', (selectedPaymentMethod[l].name).toString());
      }
    }



    placeData.append('token', JSON.parse(localStorage.getItem('token')));
    placeData.append('token_type', JSON.parse(localStorage.getItem('token_type')));
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
    placeData.forEach((value, key) => {
      console.log(key + ' ' + value);
    });
    if (localStorage.getItem('current_lang') === 'en') {
      // return 'english'
      return this.http.post('https://belocalhero.cyon.site/stawp/wp-json/outdoorf/v1/edit_place?lang=en',
        placeData);
    } else {
      // return 'german'
      return this.http.post('https://belocalhero.cyon.site/stawp/wp-json/outdoorf/v1/edit_place',
        placeData);
    }

  }

  userPlaces() {
    if (localStorage.getItem('current_lang') === 'en') {
      // return 'english'
      return this.http.get('https://belocalhero.cyon.site/stawp/wp-json/wp/v2/place/?myplaces&core&lang=en&token=' +
      JSON.parse(localStorage.getItem('token')));
    } else {
      return this.http.get('https://belocalhero.cyon.site/stawp/wp-json/wp/v2/place/?myplaces&core&token=' +
      JSON.parse(localStorage.getItem('token')));
    }
  }
}

