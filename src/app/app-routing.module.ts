import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthComponent } from './auth/auth.component';
import { HomepageComponent } from './homepage/homepage.component';
import { ThankYouComponent } from './thank-you/thank-you.component';
import { NotfoundPageComponent } from './notfound-page/notfound-page.component';
import { SinglePlaceComponent } from './single-place/single-place.component';
import { ProfileDetailsComponent } from './profile-details/profile-details.component';
import { PlacesCategoryComponent } from './places-category/places-category.component';
import { LocationResloverService } from './shared/location-reslover.service';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { AddNewPalceComponent } from './add-new-palce/add-new-palce.component';
import { FeaturedPlaceAdComponent } from './homepage/featured-place-ad/featured-place-ad.component';
import { AuthGuard } from './shared/auth.guard';
import { SingleBlogComponent } from './single-blog/single-blog.component';
import { BlogComponent } from './blog/blog.component';
import { IntroComponent } from './intro/intro.component';
import { ContactUsComponent } from './inner-pages/contact-us/contact-us.component';
import { PressComponent } from './inner-pages/press/press.component';
import { ImpressumComponent } from './inner-pages/impressum/impressum.component';
import { QuestionsAndAnswersComponent } from './inner-pages/questions-and-answers/questions-and-answers.component';
import { AdvertisingComponent } from './inner-pages/advertising/advertising.component';

import { TranslationService } from './shared/translation.service';
import { InnerPagesComponent } from './inner-pages/inner-pages.component';
import { AboutUsComponent } from './inner-pages/about-us/about-us.component';
import { from } from 'rxjs';
import { SearchResultComponent } from './common-components/search-result/search-result.component';
import { EditPlaceComponent } from './single-place/edit-place/edit-place.component';
import { LegalComponent } from './inner-pages/legal/legal.component';
import { PrivacyComponent } from './inner-pages/privacy/privacy.component';

const appRoutes: Routes = [

{path: '', redirectTo: 'de/intro', pathMatch: 'full' },
{ path: 'signup', component: AuthComponent },
{ path: 'signin', component: AuthComponent },
{ path: ':language/search-result', component: SearchResultComponent },
{ path: 'forgot-password', component: AuthComponent },
{ path: ':language', component: HomepageComponent },
{ path: ':language/thank-you', component: ThankYouComponent },
{ path: ':language/intro', component: IntroComponent },
{ path: ':language/single-place', component: SinglePlaceComponent, resolve: { location: LocationResloverService } },
{ path: ':language/profile', component: ProfileDetailsComponent, canActivate: [AuthGuard] },
{ path: ':language/single-place/:id/:slug', component: SinglePlaceComponent, resolve: { location: LocationResloverService } },
{ path: ':language/places-category', component: PlacesCategoryComponent },
{ path: ':language/add-new-place', component: AddNewPalceComponent, canActivate: [AuthGuard] },
{ path: ':language/reset-password', component: ResetPasswordComponent },
{ path: ':language/single-blog/:id/:slug', component: SingleBlogComponent },
{ path: ':language/blogs', component: BlogComponent },
{ path: ':language/edit-place/:id/:slug', component: EditPlaceComponent },
{ path: ':language/not-found', component: NotfoundPageComponent },
{ path: ':language/advertising', component: AdvertisingComponent },
{ path: ':language/pages/about-us', component: AboutUsComponent },
{ path: ':language/pages/legal', component: LegalComponent },
{ path: ':language/pages/privacy-policy', component: PrivacyComponent },
{ path: ':language/pages', component: InnerPagesComponent, children: [
	{ path: 'contact-us', component: ContactUsComponent },
	{ path: 'press', component: PressComponent },
	{ path: 'impressum', component: ImpressumComponent },
	{ path: 'q&a', component: QuestionsAndAnswersComponent },
	{ path: 'advertising', component: AdvertisingComponent },
		]
	},
{ path: '**', component: NotfoundPageComponent },
];

@NgModule({
imports: [RouterModule.forRoot(appRoutes, {
anchorScrolling: 'enabled',
scrollPositionRestoration: 'enabled',
scrollOffset: [0, 64]
})],
exports: [RouterModule]
})
export class AppRoutingModule {
}
