import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {

  constructor(private http: HttpClient) { }


  sendForgetPassword(email){
  	let forgetPassData: FormData = new FormData();
    forgetPassData.append('email', email.toString());
    forgetPassData.append('reset_page', environment.liveURL+'/'+localStorage.getItem('current_lang')+'/reset-password');
  	return this.http.post(environment.baseURL+'/wp-json/outdoorf/v1/reset_password',
  	forgetPassData )
  }

  sendResetPassword(resetData, newPass){
  	let resetPassData: FormData = new FormData();
    resetPassData.append('email', (resetData.email).toString() );
    resetPassData.append('reset_token', (resetData.token).toString() );
    resetPassData.append('reset_page', environment.liveURL+'/'+localStorage.getItem('current_lang'));
    resetPassData.append('new_password', newPass );

  	return this.http.post(environment.baseURL+'/wp-json/outdoorf/v1/reset_password2',
  	resetPassData)
  }
}
