import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { CommentsService } from '../../../shared/comments.service';

@Component({
  selector: 'app-replies',
  templateUrl: './replies.component.html',
  styleUrls: ['./replies.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RepliesComponent implements OnInit {

  viewReplies = []
  @Input() repliesCommentsComponent;
  @Input() commentId;

  constructor(private comments: CommentsService) { }

  ngOnInit() {
    this.viewReplies = this.comments.commentsReplies;
  }

}
