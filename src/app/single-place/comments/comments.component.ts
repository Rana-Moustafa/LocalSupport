import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PlacesService } from '../../shared/places.service';
import { CommentsService } from '../../shared/comments.service';
import { TranslationService } from 'src/app/shared/translation.service';
import { UserStatusService } from 'src/app/shared/user-status.service';

export interface Message {
  text: string;
}
@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CommentsComponent implements OnInit {
  @Input() rating: number;
  @Input() itemId: number;
  @Output() ratingClick: EventEmitter<any> = new EventEmitter<any>();

  // inputName: string;
  placeComments;
  commentsCount;
  isLiked;
  parentComments;
  parentCommentsScrolled;
  replies;
  showParentComments = []
  sum = 0;
  start = 0;
  isFullListDisplayed = false;
  placesLength = 0;
  loadingComments = false;
  page = 0;
  allComments = [];
  noReplies = false;
  toggleLike = false;
  likedComments = [];
  uniqueArray = [];

  @ViewChild('commentsForm', { static: true }) commentsForm: NgForm;

  constructor(private places: PlacesService,
              private comments: CommentsService,
              private route: ActivatedRoute,
              private translation: TranslationService,
              public userStatus: UserStatusService) { }

  ngOnInit() {
    // this.inputName = this.itemId + '_rating';
    this.getComments();
    this.translation.langUpdated.subscribe(
      (lang) => {
        this.showParentComments = [];
        this.getComments();

      }
    );
  }
  talkBack(e) {
    this.replies.unshift(e);
  }
  onClick(rating: number): void {
    this.rating = rating;
  }

  getComments() {
    this.loadingComments = true;
    this.sum = 2;
    this.allComments = this.allComments.concat(this.placeComments);
    this.page++;
    this.places.getPlaceParentComments(this.route.snapshot.params['id'], this.page, this.sum).subscribe(data => {
       (data);
      this.loadingComments = false;
      this.placeComments = data;
      this.placeComments = JSON.parse(JSON.stringify(this.placeComments));
      if (this.placeComments && this.placeComments.length === 0) {
        //  ('no comments')
        this.isFullListDisplayed = true;
      }

      this.placesLength = this.placeComments.length;
      for (var i = 0; i < this.placeComments.length; i++) {
        this.commentsCount = this.placeComments[i].total_comments;
        if (this.placeComments[i].parent === 0) {
          this.showParentComments.push(this.placeComments[i]);
        }
      }
       (this.commentsCount )
      // this.commentsCount = this.placeComments.length;
    }, error => {
      //  (error);
    });
  }

  getReplies(parentId) {
    this.noReplies = true;
    this.places.getPlaceReplies(this.route.snapshot.params['id'], parentId).subscribe(data => {
      //  (data)
      this.replies = JSON.parse(JSON.stringify(data));
      this.noReplies = false;
    }, error => {
      //  (error);
      this.noReplies = false;
    });
  }

  sendComment(form: NgForm) {
    this.places.addComment(this.route.snapshot.params['id'], form.value.comment, this.rating).subscribe(data => {
      // this.getComments();
      let comment;
      comment = JSON.parse(JSON.stringify(data));
      this.showParentComments.unshift(comment);
      //  (this.allComments);
      form.reset();
    }, error => {
      //  (error);
    });
  }

  likeComment(id, liked) {

    this.comments.sendLikeComment(id).subscribe(data => {
      this.isLiked = data;

      for (var i=0; i< this.showParentComments.length; i++) {
        if(this.showParentComments[i].id === id && liked) {
          this.showParentComments[i].likes_number--;
          this.showParentComments[i].liked_by_user = !liked;
        } else if (this.showParentComments[i].id === id && !liked) {
          this.showParentComments[i].likes_number++;
          this.showParentComments[i].liked_by_user = !liked;
        }
      }
    }, error => {
      //  (error);
    });
  }

  getUnique(arr, comp) {

    const unique = arr
      .map(e => e[comp])

      // store the keys of the unique objects
      .map((e, i, final) => final.indexOf(e) === i && i)

      // eliminate the dead keys & store unique objects
      .filter(e => arr[e]).map(e => arr[e]);

    return unique;
  }
}
