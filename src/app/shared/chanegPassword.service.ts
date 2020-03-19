import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChangePasswordDataService {

  constructor(private http: HttpClient) { }

  getPasswordDetails(userData){
    let userPasswordDetails: FormData = new FormData();
    userPasswordDetails.append('old_password', userData.oldPassword);
    userPasswordDetails.append('new_password', userData.newPassword);
    userPasswordDetails.append('token', JSON.parse(localStorage.getItem('token')));
    userPasswordDetails.append('token_type', JSON.parse(localStorage.getItem('token_type')));
    return this.http.post(environment.baseURL+'/wp-json/outdoorf/v1/change_password',
    userPasswordDetails);
  }

  
}
