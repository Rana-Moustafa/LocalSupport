import { Injectable, EventEmitter, Output } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  editFormStatus = new EventEmitter<boolean>();
  profileDataUpdated = new EventEmitter();
  confirmPassStatus = new EventEmitter<boolean>();
  userDataDisplay = new EventEmitter();

  private ProfilePictureSource = new BehaviorSubject(localStorage.getItem('profile_image'));
  currentProfilePicture = this.ProfilePictureSource.asObservable();

  constructor(private http: HttpClient) { }
  changeProfileImage(profileImageUrl, profileImageName) {
    let profileImageUrlDetails: FormData = new FormData();
    profileImageUrlDetails.append('token', JSON.parse(localStorage.getItem('token')));
    profileImageUrlDetails.append('token_type', JSON.parse(localStorage.getItem('token_type')));
    profileImageUrlDetails.append('profile_image', profileImageUrl);
    profileImageUrlDetails.append('profile_image_name', profileImageName);

    return this.http.post(environment.baseURL + '/wp-json/outdoorf/v1/change_image',
      profileImageUrlDetails);
  }

  changeProfilePicture(message: string) {
    this.ProfilePictureSource.next(message)
  }
  getUserDetails() {
    let userAccountDetails: FormData = new FormData();
    userAccountDetails.append('token', JSON.parse(localStorage.getItem('token')));
    userAccountDetails.append('token_type', JSON.parse(localStorage.getItem('token_type')));
    return this.http.post(environment.baseURL + '/wp-json/outdoorf/v1/profile',
      userAccountDetails);
  }

  editUserDetails(user) {
    let userEditDetails: FormData = new FormData();
    userEditDetails.append('token', JSON.parse(localStorage.getItem('token')));
    userEditDetails.append('token_type', JSON.parse(localStorage.getItem('token_type')));
    userEditDetails.append('country', user.country);
    userEditDetails.append('city', user.city);
    userEditDetails.append('email', user.email);
    userEditDetails.append('name', user.username);
    userEditDetails.append('address', user.address);

    return this.http.post(environment.baseURL + '/wp-json/outdoorf/v1/edit_profile',
      userEditDetails);
  }

  updateProfileReview(comment, id, rating) {
    let editProfileReview: FormData = new FormData();
    editProfileReview.append('token', JSON.parse(localStorage.getItem('token')));
    editProfileReview.append('token_type', JSON.parse(localStorage.getItem('token_type')));
    editProfileReview.append('rating', rating);
    editProfileReview.append('comment_id', id);
    editProfileReview.append('content', comment);

    if(localStorage.getItem('current_lang') === 'en') {
      return this.http.post(environment.baseURL + '/wp-json/outdoorf/v1/edit_comment?core&lang=en',
      editProfileReview);
    }
    else{
      return this.http.post(environment.baseURL + '/wp-json/outdoorf/v1/edit_comment?core',
      editProfileReview);
    }
  }

  DeleteProfileReview(id, comment_type) {
    let deleteProfileRevieww: FormData = new FormData();
    deleteProfileRevieww.append('token', JSON.parse(localStorage.getItem('token')));
    deleteProfileRevieww.append('token_type', JSON.parse(localStorage.getItem('token_type')));
    if ( localStorage.getItem('current_lang') === 'en') {
      return this.http.delete(environment.baseURL + '/wp-json/comments/' + id + '?token='
      + JSON.parse(localStorage.getItem('token')) + '&token_type=' + JSON.parse(localStorage.getItem('token_type')) +
      '&Content-Type=application/x-www-form-urlencoded&lang=en'
      );
    } else {
      return this.http.delete(environment.baseURL + '/wp-json/comments/' + id + '?token='
      + JSON.parse(localStorage.getItem('token')) + '&token_type=' + JSON.parse(localStorage.getItem('token_type')) +
       '&Content-Type=application/x-www-form-urlencoded'
      );
    }
  }
  removeAccount() {
    let userAccountDetails: FormData = new FormData();
    userAccountDetails.append('token', JSON.parse(localStorage.getItem('token')));
    userAccountDetails.append('token_type', JSON.parse(localStorage.getItem('token_type')));
    return this.http.post(environment.baseURL + '/wp-json/outdoorf/v1/delete_account',
      userAccountDetails);
  }

  getAutherData(id){
    return this.http.get(environment.baseURL + '/wp-json/wp/v2/users/' + id);
  }
}

