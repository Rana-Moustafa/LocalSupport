import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { subscribeOn } from 'rxjs-compat/operator/subscribeOn';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private http: HttpClient, private router: Router) {  }
  getSingleBlogDetails(id){
    if(localStorage.getItem('current_lang') == 'en'){
      return this.http.get(environment.baseURL+'/wp-json/wp/v2/posts/'+id+'?lang=en')
    }
    else{
      return this.http.get(environment.baseURL+'/wp-json/wp/v2/posts/'+id)
    }
    
  }
}
