import { Injectable, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd, RoutesRecognized } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  lang;
  urlLang;
  @Output() langUpdated: EventEmitter<any> =   new EventEmitter();

  constructor(private route: ActivatedRoute,
              private router: Router,
              public translate: TranslateService) { }

  addLangToStorage(lang){
    localStorage.setItem('current_lang', lang)
  }            

  addTranslationLanguage(lang){
    this.lang = lang;
    
    this.langUpdated.emit(this.lang);
    localStorage.setItem('current_lang', lang)
  }

  getLang() {
    return this.lang;
  }

  addRouterLangParam(){
    //this.router.events.filter(e => e instanceof NavigationEnd).subscribe(e => {
    //});
    
  }

}
