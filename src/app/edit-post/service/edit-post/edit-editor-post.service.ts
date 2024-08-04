import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EditPostRequest } from 'src/app/edit-post/pojo/edit-post-request';
import { EditPostResponse } from 'src/app/edit-post/pojo/edit-post-response';
import { CheckRefreshTokenService } from 'src/app/shared/services/check-refresh-token/check-refresh-token.service';
import { PostService } from 'src/app/shared/services/post/post.service';

@Injectable({
  providedIn: 'root'
})
export class EditPostService {

  constructor(
    private postService: PostService,
    private checkRefreshToken: CheckRefreshTokenService
  ) { }


  editPost(endpoint: string, type: string, post_id: number, uid: number, edit_title: string, edit_content: string): Observable<EditPostResponse> {
    this.checkRefreshToken.runCheckRefreshToken();
    const request = new EditPostRequest(post_id, uid, type, edit_title, edit_content);
    const body: string = JSON.stringify(request);
    let header: HttpHeaders = new HttpHeaders();
    header = header.append("Accept", 'application/json');
    header = header.append('Content-Type', 'application/json');
    return this.postService.post(endpoint, header, body, true);
  }
}
