import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CommentsService } from '../../shared/comments.service';
import { UserDataService } from '../../shared/user-data.service';
import { CssSelector } from '@angular/compiler';
import { TranslationService } from 'src/app/shared/translation.service';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-reviews',
  templateUrl: './profile-reviews.component.html',
  styleUrls: ['./profile-reviews.component.scss']
})
export class ProfileReviewsComponent implements OnInit {
  @ViewChild('commentsReplyForm', { static: true }) editProfileReview: NgForm;
  @Input() rating: number;
  @Input() itemId: number;
  @Output() ratingClick: EventEmitter<any> = new EventEmitter<any>();

  inputName: string;
  reviewsCount = 6;
  CommentsData;
  content;
  starRating = 0;
  editForm = false;
  closeForm = false;
  MainComment = [];
  editEnabled = false;
  editIndex;
  ReviewEmpty;
  isFullListDisplayed = false;
  allUserReviews = [];
  page = 0;
  perPage = 10;
  langURL = localStorage.getItem('current_lang');

  constructor(private userDataService: UserDataService,
              private comments: CommentsService,
              private translation: TranslationService,
              private router: Router) { }

  ngOnInit() {

    this.getComments();
    this.inputName = this.itemId + '_rating';

    this.translation.langUpdated.subscribe(
      (lang) => {
        this.MainComment = [];
        this.getComments();
      }
    );
  }

  getComments() {
    if (!this.isFullListDisplayed) {
      this.page++;
      this.comments.getUserComments(this.page, this.perPage).subscribe(data => {
        this.CommentsData = data;
         ('Reviews');
         (data)
        if (this.CommentsData.length < 1) {
          this.ReviewEmpty = true;
          this.isFullListDisplayed = true;
        }

         (this.CommentsData);
        for (var i = 0; i < this.CommentsData.length; i++) {
          if (this.CommentsData[i].parent === 0) {
            this.MainComment.push(this.CommentsData[i]);
          }
          if (this.CommentsData.rating) {
            this.CommentsData.rating = 2.30;
          } else {
            this.starRating = 0;
          }
        }
        if (this.CommentsData && this.CommentsData.length === 0) {
          this.isFullListDisplayed = true;
        }
      }, error => {
        this.isFullListDisplayed = true;
      });
    }
  }


  onEditProfile(e, id, rating) {
    this.userDataService.updateProfileReview(e.value.username, id, rating).subscribe(data => {
      this.editEnabled = false;
      this.userDataService.editFormStatus.emit(false);
    }, error => {
      //  (error);
    });
  }

  onClick(rating: number): void {
    this.rating = rating;
    this.ratingClick.emit({
      itemId: this.itemId,
      rating: rating
    });
  }
  DeleteProfileReviewFunction(id, comment_type) {
    this.userDataService.DeleteProfileReview(id, comment_type).subscribe(data => {
      this.MainComment = [];
      this.getComments();
    }, error => {
      //  (error);
    });
  }
  toggleEditMode(commentID) {
    this.editEnabled = !this.editEnabled;
    this.editIndex = commentID;
    //  (this.editIndex);
  }
}
