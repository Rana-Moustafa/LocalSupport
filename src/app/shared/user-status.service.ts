import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserStatusService {
  loginError = false;
  isLoggedIn = false;
  constructor() { }

    userLoggedIn(){
		if(localStorage.getItem('token')){
		  	return this.isLoggedIn = true;
		}
    }
    userLoggedOut(){
	  if(!localStorage.getItem('token')){
	  	return this.isLoggedIn = false;
	  	}
  }
  
}
