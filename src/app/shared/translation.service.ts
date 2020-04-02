import { Injectable, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd, RoutesRecognized } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  lang;
  urlLang;
  @Output() langUpdated: EventEmitter<any> = new EventEmitter();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public translate: TranslateService) {

    // this language will be used as a fallback when a translation isn't found in the current language
    // the lang to use, if the lang isn't available, it will use the current loader to get them
    // translate.use('de');
  }

  useLanguage(language: string) {
    this.langUpdated.emit(language);
    this.translate.use(language);
    localStorage.setItem('current_lang', language);
  }
  addLangToStorage(lang) {
    localStorage.setItem('current_lang', lang);
  }

  addTranslationLanguage(lang) {
    this.lang = lang;

    this.langUpdated.emit(this.lang);
    localStorage.setItem('current_lang', lang);
  }

  getLang() {
    return this.lang;
  }

  addRouterLangParam() {
    // this.router.events.filter(e => e instanceof NavigationEnd).subscribe(e => {
    // });
  }

}
