import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';

import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { RouterModule } from '@angular/router';

import { SocialLoginModule, AuthServiceConfig, GoogleLoginProvider, FacebookLoginProvider } from "angularx-social-login";
import { AgmCoreModule } from '@agm/core';
import { AgmJsMarkerClustererModule } from '@agm/js-marker-clusterer';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { AuthComponent } from './auth/auth.component';
import { RegisterationComponent } from './auth/registeration/registeration.component';
import { LoginComponent } from './auth/login/login.component';

import { CountriesService } from './shared/countries.service';
import { PlacesService } from './shared/places.service';
import { ResetPasswordService } from './shared/reset-password.service';
import { EqualValidator } from './helpers/equal-validator.directive';
import { HomepageComponent } from './homepage/homepage.component';

import { AppRoutingModule } from './app-routing.module';
import { AuthenticationService } from './shared/auth.service';
import { UserStatusService } from './shared/user-status.service';
import { UserDataService } from './shared/user-data.service';
import { CommonsService } from './shared/commons.service';

import { CommentsService } from './shared/comments.service';
import { AuthGuard } from './shared/auth.guard';

import { HeaderComponent } from './common-components/header/header.component';
import { FooterComponent } from './common-components/footer/footer.component';
import { ThankYouComponent } from './thank-you/thank-you.component';
import { NotfoundPageComponent } from './notfound-page/notfound-page.component';
import { FacebookLoginComponent } from './auth/login/facebook-login/facebook-login.component';
import { GoogleLoginComponent } from './auth/login/google-login/google-login.component';
import { LoadingSpinnerComponent } from './common-components/loading-spinner/loading-spinner.component';
import { ProfileDetailsComponent } from './profile-details/profile-details.component';
import { SinglePlaceComponent } from './single-place/single-place.component';
import { SliderComponent } from './single-place/slider/slider.component';
import { DetailsComponent } from './single-place/details/details.component';
import { CommentsComponent } from './single-place/comments/comments.component';
import { ProfileFavoritesComponent } from './profile-details/profile-favorites/profile-favorites.component';
import { ProfileReviewsComponent } from './profile-details/profile-reviews/profile-reviews.component';
import { RelatedPlacesComponent } from './single-place/related-places/related-places.component';
import { AccountDetailsComponent } from './profile-details/account-details/account-details.component';
import { ChangePasswordComponent } from './profile-details/account-details/change-password/change-password.component';
import { EditProfileComponent } from './profile-details/account-details/edit-profile/edit-profile.component';
import { DisplayProfileDetailsComponent } from './profile-details/account-details/display-profile-details/display-profile-details.component';
import { PlacesCategoryComponent } from './places-category/places-category.component';
import { PlacesCategoryListComponent } from './places-category/places-category-list/places-category-list.component';
import { FeaturedPlaceAdComponent } from './homepage/featured-place-ad/featured-place-ad.component';
import { LocationResloverService } from './shared/location-reslover.service';
import { TranslationService } from './shared/translation.service';
import { MapsService } from './shared/maps.service';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { RepliesComponent } from './single-place/comments/replies/replies.component';
import { AddRepliesComponent } from './single-place/comments/add-replies/add-replies.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { AddNewPalceComponent } from './add-new-palce/add-new-palce.component';
import { TestimonialsComponent } from './homepage/testimonials/testimonials.component';
import { FilterComponent } from './places-category/filter/filter.component';
import { WhoWeAreComponent } from './homepage/who-we-are/who-we-are.component';
import { Ng5SliderModule } from 'ng5-slider';
import { MapComponent } from './homepage/map/map.component';
import { CookieLawModule } from 'angular2-cookie-law';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { CategoriesSliderComponent } from './homepage/categories-slider/categories-slider.component';
import { SingleBlogComponent } from './single-blog/single-blog.component';
import { BlogComponent } from './blog/blog.component';
import { SearchResultComponent } from './common-components/search-result/search-result.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { CookieComponent } from './cookie/cookie.component';
import { NewsletterComponent } from './homepage/newsletter/newsletter.component';
import { TranslationComponent } from './translation/translation.component';
// import { BlogListComponent } from './blog-list/blog-list.component';
import { FilterPipe } from './shared/filter.pipe';
import { ShareButtonsModule } from 'ngx-sharebuttons';
import { ShareModule } from '@ngx-share/core';
import { NoInternetConnectionComponent } from './common-components/no-internet-connection/no-internet-connection.component';
import { IntroComponent } from './intro/intro.component';
import { ContactUsComponent } from './inner-pages/contact-us/contact-us.component';
import { PressComponent } from './inner-pages/press/press.component';
import { ImpressumComponent } from './inner-pages/impressum/impressum.component';
import { QuestionsAndAnswersComponent } from './inner-pages/questions-and-answers/questions-and-answers.component';
import { AdvertisingComponent } from './inner-pages/advertising/advertising.component';
import { InnerPagesComponent } from './inner-pages/inner-pages.component';
import { AboutUsComponent } from './inner-pages/about-us/about-us.component';
import { ServiceWorkerModule } from '@angular/service-worker';
// import Swal from 'sweetalert2';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
import { NgxPageScrollCoreModule } from 'ngx-page-scroll-core';
import { NgxUploadModule, MineTypeEnum, DropTargetOptions } from '@wkoza/ngx-upload';
import { NgxImageCompressService } from 'ngx-image-compress';
import { AddToFavListComponent } from './add-to-fav-list/add-to-fav-list.component';
import { EditPlaceComponent } from './single-place/edit-place/edit-place.component';
import { ProfilePlacesComponent } from './profile-details/profile-places/profile-places.component';
import { LegalComponent } from './inner-pages/legal/legal.component';
import { PrivacyComponent } from './inner-pages/privacy/privacy.component';

let config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider('311022123453-ut75bomf2alb6pg1rb0b893k2nc6q2n3.apps.googleusercontent.com')
  },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider('1338176049717731')
  }
]);

export function provideConfig() {
  return config;
}

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/');
}

export const ngxDropTargetOptions: DropTargetOptions = {
  color: 'dropZoneColor',
  colorDrag: 'dropZoneColorDrag',
  colorDrop: 'dropZoneColorDrop',
  multiple: true,
  accept: [MineTypeEnum.Image, MineTypeEnum.Application_Pdf]
};

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    RegisterationComponent,
    LoginComponent,
    EqualValidator,
    HomepageComponent,
    HeaderComponent,
    FooterComponent,
    FacebookLoginComponent,
    ThankYouComponent,
    NotfoundPageComponent,
    GoogleLoginComponent,
    LoadingSpinnerComponent,
    ProfileDetailsComponent,
    ProfileFavoritesComponent,
    ProfileReviewsComponent,
    SinglePlaceComponent,
    SliderComponent,
    DetailsComponent,
    CommentsComponent,
    RelatedPlacesComponent,
    AccountDetailsComponent,
    ChangePasswordComponent,
    EditProfileComponent,
    DisplayProfileDetailsComponent,
    PlacesCategoryComponent,
    PlacesCategoryListComponent,
    FeaturedPlaceAdComponent,
    RepliesComponent,
    AddRepliesComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    TestimonialsComponent,
    FilterComponent,
    MapComponent,
    AddNewPalceComponent,
    CategoriesSliderComponent,
    SingleBlogComponent,
    BlogComponent,
    NewsletterComponent,
    TranslationComponent,
    FilterPipe,
    WhoWeAreComponent,
    NoInternetConnectionComponent,
    IntroComponent,
    ContactUsComponent,
    PressComponent,
    ImpressumComponent,
    QuestionsAndAnswersComponent,
    AdvertisingComponent,
    InnerPagesComponent,
    AboutUsComponent,
    AddToFavListComponent,
    SearchResultComponent,
    CookieComponent,
    EditPlaceComponent,
    ProfilePlacesComponent,
    LegalComponent,
    PrivacyComponent
    // CarouselHolderComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    SocialLoginModule,
    BrowserAnimationsModule,
    InfiniteScrollModule,
    Ng5SliderModule,
    CookieLawModule,
    NgxMaterialTimepickerModule,
    ShareButtonsModule.forRoot(),
    ScrollToModule.forRoot(),
    NgxPageScrollCoreModule,
    ShareModule,
    CarouselModule,
    ImageCropperModule,
    NgxUploadModule.forRoot(ngxDropTargetOptions),
    // Swal.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyA3wukOzjOzk-WHer4jJ83B-p2rcSBih7s',
      libraries: ['places']
    }),
    AgmJsMarkerClustererModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    // ServiceWorkerModule.register('./ngsw-worker.js', { enabled: environment.production })
  ],
  exports: [RouterModule],
  schemas: [NO_ERRORS_SCHEMA],
  providers: [CountriesService,
    AuthenticationService,
    AuthGuard,
    CommonsService,
    UserStatusService,
    UserDataService,
    LocationResloverService,
    CommentsService,
    ResetPasswordService,
    TranslationService,
    PlacesService,
    NgxImageCompressService,
    MapsService,
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
