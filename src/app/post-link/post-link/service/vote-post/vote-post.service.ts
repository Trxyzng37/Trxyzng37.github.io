import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PostService } from 'src/app/shared/services/post/post.service';
import { VotePostRequest } from './pojo/vote-post-request';
import { VotePostResponse } from './pojo/vote-post-response';
import { HttpHeaders } from '@angular/common/http';
import { CheckRefreshTokenService } from 'src/app/shared/services/check-refresh-token/check-refresh-token.service';

@Injectable({
  providedIn: 'root'
})
export class VotePostService {

  constructor(
    private postService: PostService,
    private checkRefreshToken: CheckRefreshTokenService
  ) { }

  private endpoint: string = "/vote-post";

  votePost(post_id: number, vote:number, uid: number, type: string): Observable<VotePostResponse> {
    this.checkRefreshToken.runCheckRefreshToken();
    let header: HttpHeaders = new HttpHeaders();
    const votePostRequest: VotePostRequest = new VotePostRequest(post_id, vote, uid, type);
    const body: string = JSON.stringify(votePostRequest);
    header = header.append("Accept", 'application/json');
    header = header.append('Content-Type', 'application/json');
    return this.postService.post(this.endpoint, header, body, true);
  }
}
