import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { subscribeOn } from 'rxjs-compat/operator/subscribeOn';
import { environment } from '../../environments/environment';
import { BehaviorSubject, Subject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CommonsService {
  visible = true;
  darkHeader = false;
  lightHeader = true;
  showLoading = false;
  noTranslation = false;
  addLangApi;
  showPadding = true;

  private scollAnchorSource = new BehaviorSubject('');
  currentscollAnchor = this.scollAnchorSource.asObservable();

  // private languageSwitcherStatus = new Subject<any>();
  public languageSwitcherStatus = new BehaviorSubject<boolean>(true);
  currentLanguageStatus = this.languageSwitcherStatus.asObservable();

  constructor(private http: HttpClient, private router: Router) {
    this.visible = true;
    if (localStorage.getItem('current_lang') === 'en') {
      this.addLangApi = 'lang=en';
    } else {
      this.addLangApi = '';
    }
  }
  changeLanguageSwitcherStatus(message: boolean) {
    this.languageSwitcherStatus.next(message);
  }


  sendAnchorScollId(message: string) {
    this.scollAnchorSource.next(message);
    // console.log(message);
  }

  showLoadingSpinner() {
    this.showLoading = true;
  }

  hideLoadingSpinner() {
    this.showLoading = false;
  }
  show() { this.visible = true; }
  hide() { this.visible = false; }
  innerHeader() {
    if (this.router.navigate(['/profile'])) {
      this.visible = true;
    }
  }

  hideTranslation() {
    this.noTranslation = true;
  }

  postSubscribtion(newsletter) {
    let newsletterData: FormData = new FormData();
    newsletterData.append('email', newsletter);
    newsletterData.append('lang', 'en');

    return this.http.post(environment.baseURL + '/wp-json/outdoorf/v1/subscribe_newsletter',
      newsletterData
    )
  }
  getMenuItems() {
    return this.http.get(environment.baseURL + '/wp-json/outdoorf/v1/menus/header');
  }
  getSocialIcons() {
    return this.http.get(environment.baseURL + '/wp-json/outdoorf/v1/footer');
  }
  getUserAvatar() {
    // return (localStorage.getItem('profile_image'));
  }
  getCookiesDetails() {
    return this.http.get(environment.baseURL + '/wp-json/outdoorf/v1/cookies');
  }

  getHomePageData() {
    if (localStorage.getItem('current_lang') === 'en') {
      return this.http.get(environment.baseURL + '/wp-json/outdoorf/v1/home?lang=en');
    }
    return this.http.get(environment.baseURL + '/wp-json/outdoorf/v1/home');
  }
  getBlogPageData(lang, page, perpage) {

    if (lang === 'en') {
      return this.http.get(environment.baseURL + '/wp-json/wp/v2/posts?page=' + page + '&per_page=' + perpage + '&lang=en');
    } else {
      return this.http.get(environment.baseURL + '/wp-json/wp/v2/posts?page=' + page + '&per_page=' + perpage);
    }
  }
  getThankYouData() {
    if (localStorage.getItem('current_lang') === 'en') {
      return this.http.get(environment.baseURL + '/wp-json/outdoorf/v1/thank_you?lang=en');
    } else {
      return this.http.get(environment.baseURL + '/wp-json/outdoorf/v1/thank_you');
    }
  }
  getNotFound() {
    if (localStorage.getItem('current_lang') === 'en') {
      return this.http.get(environment.baseURL + '/wp-json/outdoorf/v1/404?lang=en');
    } else {
      return this.http.get(environment.baseURL + '/wp-json/outdoorf/v1/404');
    }
  }
  getIntroData() {
    if (localStorage.getItem('current_lang') === 'en') {
      return this.http.get(environment.baseURL + '/wp-json/outdoorf/v1/intro?lang=en');
    } else {
      return this.http.get(environment.baseURL + '/wp-json/outdoorf/v1/intro');
    }
  }
  getAboutPage(lang) {
    if (lang === 'en') {
      return this.http.get(environment.baseURL + '/wp-json/outdoorf/v1/about?lang=en');
    } else if (lang === 'de') {
      return this.http.get(environment.baseURL + '/wp-json/outdoorf/v1/about');
    }
  }
  getTestimonials(testimonialsIds) {
    const token = localStorage.getItem('token');
    let params = new HttpParams();
    params = params.append('token', localStorage.getItem('token'));
    params = params.append('token_type', localStorage.getItem('token_type'));
    if (localStorage.getItem('current_lang') === 'en') {
      return this.http.get(environment.baseURL + '/wp-json/wp/v2/comments?core' + testimonialsIds + '&lang=en');
    } else {
      return this.http.get(environment.baseURL + '/wp-json/wp/v2/comments?core' + testimonialsIds);
    }

  }

  getPrivacyPage() {
    if (localStorage.getItem('current_lang') === 'en') {
      return this.http.get(environment.baseURL + '/wp-json/outdoorf/v1/policy?lang=en');
    } else {
      return this.http.get(environment.baseURL + '/wp-json/outdoorf/v1/policy');
    }
  }
}

