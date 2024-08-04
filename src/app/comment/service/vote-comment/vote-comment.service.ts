import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PostService } from 'src/app/shared/services/post/post.service';
import { VoteCommentResponse } from '../../pojo/vote-comment-response';
import { StorageService } from 'src/app/shared/storage/storage.service';
import { VotePostRequest } from 'src/app/post-link/post-link/service/vote-post/pojo/vote-post-request';
import { voteCommentRequest } from '../../pojo/vote-comment-request';
import { HttpHeaders } from '@angular/common/http';
import { CheckRefreshTokenService } from 'src/app/shared/services/check-refresh-token/check-refresh-token.service';

@Injectable({
  providedIn: 'root'
})
export class VoteCommentService {

  constructor(
    private postService: PostService,
    private storageService: StorageService,
    private checkRefreshToken: CheckRefreshTokenService
  ) { }

  private endpoint: string = "/update-comment-vote";

  updateVoteComment(post_id: number, _id: number, vote: number, vote_type: string): Observable<VoteCommentResponse> {
    this.checkRefreshToken.runCheckRefreshToken();
    const uid = parseInt(this.storageService.getItem("uid"));
    const request = new voteCommentRequest(post_id, uid, _id, vote, vote_type);
    const body: string = JSON.stringify(request);
    let header: HttpHeaders = new HttpHeaders();
    header = header.append("Accept", 'application/json');
    header = header.append('Content-Type', 'application/json');
    return this.postService.post(this.endpoint, header, body, true);
  }
}
