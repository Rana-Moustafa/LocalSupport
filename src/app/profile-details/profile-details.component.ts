
import { Component, OnInit } from '@angular/core';
import { UserDataService } from '../shared/user-data.service';
import { CommonsService } from '../shared/commons.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { TranslationService } from '../shared/translation.service';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { TranslateService } from '@ngx-translate/core';

declare let swal: any;

@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.scss']
})
export class ProfileDetailsComponent implements OnInit {

  returnedUserInfo;
  selectedUserInfo;
  profileImageUrl;
  url;
  imageUrl;
  uploadedImage;
  userData;
  isLoading = false;
  innerHeader = true;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  cropper = {
    x1: 0,
    y1: 0,
    x2: 500,
    y2: 500
  };

  imagesCount;
  imagesUrls = [];
  newProfilePicture;


  constructor(private router: Router,
              private userDataService: UserDataService,
              private commons: CommonsService,
              private route: ActivatedRoute,
              private translation: TranslationService,
              private translate: TranslateService) { }

  ngOnInit() {
    console.log(this.selectedUserInfo)
    this.userDataService.currentProfilePicture.subscribe(picture => this.url = picture);
    this.commons.darkHeader = true;
    this.commons.lightHeader = true;
    // this.router.navigateByUrl(this.router.url.replace(this.route.snapshot.params.language, localStorage.getItem('current_lang')));
    this.translation.langUpdated.subscribe(
      (lang) => {
        localStorage.setItem('current_lang', lang);
        this.router.navigateByUrl(this.router.url.replace(this.route.snapshot.params.language,
          lang));
      }
    );

  }
  fileChangeEvent(event: any) {
    this.imageChangedEvent = event;
    this.uploadedImage = event.target.files[0].name;
    this.imagesCount = event.target.files.length;
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }

  updateProfilePicture() {
    this.commons.showLoadingSpinner();
    this.userDataService.changeProfileImage(this.croppedImage, this.uploadedImage).subscribe(data => {
      this.imageUrl = data;
      this.newProfilePicture = this.croppedImage;
      this.userDataService.changeProfilePicture(this.newProfilePicture);
      this.commons.hideLoadingSpinner();
      localStorage.setItem('profile_image', JSON.stringify(this.newProfilePicture));
    }, (error) => {
      // console.log(error);
      this.commons.hideLoadingSpinner();
    });

  }
  imageLoaded() {
    // console.log(e)
    // show cropper
  }
  cropperReady() {
    // cropper ready
  }
  loadImageFailed() {
    // show message
  }

  public delete() {
    this.url = null;
  }
  getSelectedUserProfilePicture(info) {
    console.log(info)
    this.selectedUserInfo = info;
    this.url = this.selectedUserInfo.profile_image;
  }


  deleteAccount() {
    this.userDataService.removeAccount().subscribe(data => {
      this.removeUserDataFromLocalStorage();
      this.router.navigate(['/']);

    }, (errorMessage) => {
      this.isLoading = false;
    });
  }
  removeAccountFunction() {
    Swal.fire({
      title: this.translate.instant('account_delete_1'),
      text: this.translate.instant('account_delete_2'),
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: this.translate.instant('account_delete_btn_1'),
      cancelButtonText: this.translate.instant('account_delete_btn_2'),
    }).then((result) => {
      if (result.value) {
        this.deleteAccount();
        Swal.fire(
          this.translate.instant('account_delete_success_1'),
          this.translate.instant('account_delete_success_2'),
          'success'
        )
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your Account is safe :)',
          'error'
        )
      }
    })
  }

  private removeUserDataFromLocalStorage() {
    localStorage.removeItem('token');
    localStorage.removeItem('profile_image');
    localStorage.removeItem('token_type');
  }
}
