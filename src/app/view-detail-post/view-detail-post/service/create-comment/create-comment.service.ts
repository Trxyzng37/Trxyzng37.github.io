import { Injectable } from '@angular/core';
import { PostService } from 'src/app/shared/services/post/post.service';
import { CommentRequest } from '../../pojo/create-comment-request';
import { Observable, of } from 'rxjs';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { CreateCommentResponse } from '../../pojo/create-comment-response';
import { StorageService } from 'src/app/shared/storage/storage.service';
import { CheckRefreshTokenService } from 'src/app/shared/services/check-refresh-token/check-refresh-token.service';

@Injectable({
  providedIn: 'root'
})
export class CreateCommentService {

  constructor(
    private postService: PostService,
    private storageService: StorageService,
    private checkRefreshToken: CheckRefreshTokenService
  ) { }

  private endpoint: string = "/save-comment";

  createComment(post_id: number, parent_id: number, content: string, level: number): Observable<CreateCommentResponse> {
    this.checkRefreshToken.runCheckRefreshToken();
    const uid = this.storageService.getItem("uid") == "" ? 0 : parseInt(this.storageService.getItem("uid"));
    const request = new CommentRequest(post_id, uid, parent_id, content, level);
    const body: string = JSON.stringify(request);
    let header: HttpHeaders = new HttpHeaders();
    header = header.append("Accept", 'application/json');
    header = header.append('Content-Type', 'application/json');
    return this.postService.post(this.endpoint, header, body, true);
  }
}
