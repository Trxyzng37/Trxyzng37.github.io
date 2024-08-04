import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PostService } from 'src/app/shared/services/post/post.service';
import { StorageService } from 'src/app/shared/storage/storage.service';
import { Comment } from 'src/app/view-detail-post/view-detail-post/pojo/comment';
import { EditCommentRequest } from '../../pojo/edit-comment-request';
import { CheckRefreshTokenService } from 'src/app/shared/services/check-refresh-token/check-refresh-token.service';

@Injectable({
  providedIn: 'root'
})
export class EditCommentService {

  constructor(
    private storageService: StorageService,
    private postService: PostService,
    private checkRefreshToken: CheckRefreshTokenService
  ) { }

  private endpoint: string = "/edit-comment";

  editComment(post_id: number, _id: number, edit_content: string): Observable<Comment> {
    this.checkRefreshToken.runCheckRefreshToken();
    const uid = parseInt(this.storageService.getItem("uid"));
    const request = new EditCommentRequest(post_id, uid, _id, edit_content);
    const body: string = JSON.stringify(request);
    let header: HttpHeaders = new HttpHeaders();
    header = header.append("Accept", 'application/json');
    header = header.append('Content-Type', 'application/json');
    return this.postService.post(this.endpoint, header, body, true);
  }
}
