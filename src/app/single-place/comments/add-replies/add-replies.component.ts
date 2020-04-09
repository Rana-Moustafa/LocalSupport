import { Component, OnInit, ViewEncapsulation, ViewChild, Input, EventEmitter, Output } from '@angular/core';
import { CommentsService } from '../../../shared/comments.service';

import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-replies',
  templateUrl: './add-replies.component.html',
  styleUrls: ['./add-replies.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddRepliesComponent implements OnInit {

  @ViewChild('commentsReplyForm', { static: true }) commentsReplyForm: NgForm;
  @Input() parentCommentIndex;

  @Output() talk: EventEmitter<string> = new EventEmitter<any>();

  constructor(private comments: CommentsService,
              private route: ActivatedRoute) { }

  ngOnInit() {
  }

  sendReply(index) {

    this.comments.sendCommentsReply(this.route.snapshot.params['id'], index, this.commentsReplyForm.value.message).subscribe( data => {
    //  (data);
      this.talkBack(JSON.parse(JSON.stringify(data)));
      this.commentsReplyForm.reset();
    }, error => {
      //  (error);
    });
  }

  talkBack(say) {
    this.talk.emit(say);
  }
}
