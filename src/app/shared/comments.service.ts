import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  commentsReplies = [];
  constructor(private http: HttpClient) { }


  getUserComments(page, perpage) {
    if (localStorage.getItem('current_lang') === 'en') {
      return this.http.get(environment.baseURL + '/wp-json/wp/v2/comments?author_id=' + JSON.parse(localStorage.getItem('id')) + '&lang=en&page='+page+'&per_page='+perpage)
    }
    else{
      return this.http.get(environment.baseURL + '/wp-json/wp/v2/comments?author_id=' + JSON.parse(localStorage.getItem('id'))+'&page='+page+'&per_page='+perpage)
    }
  }
  getTestimonialComments() {
    if (localStorage.getItem('current_lang') === 'en') {
      return this.http.get(environment.baseURL + '/wp-json/wp/v2/comments?include[]=2&include[]=1')
    }
    else{
      return this.http.get(environment.baseURL + '/wp-json/wp/v2/comments?include[]=2&include[]=1')
    }
    
  }
  setReplies(reply) {
    this.commentsReplies = reply;
  }
  sendLikeComment(commentId) {
    let likeData: FormData = new FormData();
    likeData.append('token', JSON.parse(localStorage.getItem('token')));
    likeData.append('token_type', JSON.parse(localStorage.getItem('token_type')));
    likeData.append('comment_id', commentId);
    if (localStorage.getItem('current_lang') === 'en') {
      return this.http.post(environment.baseURL + '/wp-json/outdoorf/v1/like_comment?lang=en',
        likeData
      )
    }
    else{
      return this.http.post(environment.baseURL + '/wp-json/outdoorf/v1/like_comment',
      likeData
    )
    }
    
  }

  sendCommentsReply(id, index, reply) {
    let replyData: FormData = new FormData();
    replyData.append('post', id);
    replyData.append('content', reply);
    replyData.append('token', JSON.parse(localStorage.getItem('token')));
    replyData.append('token_type', JSON.parse(localStorage.getItem('token_type')));
    replyData.append('parent', index);
    if (localStorage.getItem('current_lang') === 'en') {
      return this.http.post(environment.baseURL + '/wp-json/wp/v2/comments?lang=en',
        replyData
      )
    }
    else {
      return this.http.post(environment.baseURL + '/wp-json/wp/v2/comments',
        replyData
      )
    }


  }
}