import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreatePostRequest } from 'src/app/create-post/pojo/create-post-request';
import { CreatePostResponse } from 'src/app/create-post/pojo/create-post-response';
import { CheckRefreshTokenService } from 'src/app/shared/services/check-refresh-token/check-refresh-token.service';
import { PostService } from 'src/app/shared/services/post/post.service';
import { StorageService } from 'src/app/shared/storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class SendPostService {

  constructor(
    private postService: PostService,
    private storageService: StorageService,
    private checkRefreshToken: CheckRefreshTokenService
  ) {}

  private endpoint: string = "/create-post";

  createPost(type: string, community_id: number, title: string, content: string, created_at: Date, allow: number): Observable<CreatePostResponse> {
    this.checkRefreshToken.runCheckRefreshToken();
    const uid = this.storageService.getItem("uid") === "" ? 0 :  Number.parseInt(this.storageService.getItem("uid"));
    const request = new CreatePostRequest(type, uid, community_id, title, content, created_at, allow);
    const body: string = JSON.stringify(request);
    // console.log(request)
    let header: HttpHeaders = new HttpHeaders();
    header = header.append("Accept", 'application/json');
    header = header.append('Content-Type', 'application/json');
    // header = header.append('Access-Control-Allow-Origin', '*');
    return this.postService.post(this.endpoint, header, body, true);
  }
}
