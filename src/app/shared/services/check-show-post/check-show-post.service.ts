import { Injectable } from '@angular/core';
import { PostService } from '../post/post.service';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DefaultResponse } from '../../pojo/default-response';
import { ShowPostRequest } from './pojo/show-post-request';

@Injectable({
  providedIn: 'root'
})
export class CheckShowPostService {

  constructor(
    private postService: PostService
  ) { }

  private endpoint: string = "/show-post";

  setShowPost(uid: number, post_id: number, show: number): Observable<DefaultResponse> {
    let header: HttpHeaders = new HttpHeaders();
    const obj: ShowPostRequest = new ShowPostRequest(uid, post_id, show);
    const body: string = JSON.stringify(obj);
    header = header.append("Accept", 'application/json');
    header = header.append('Content-Type', 'application/json');
    return this.postService.post(this.endpoint, header, body, true);
  }
}
