import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DefaultResponse } from '../../pojo/default-response';
import { GetService } from '../get/get.service';
import { PostService } from '../post/post.service';
import { HttpHeaders } from '@angular/common/http';
import { SavedPostRequest } from './pojo/saved-post-request';
import { GetPostResponse } from 'src/app/post-link-list/pojo/get-post-response';
import { SavedPostResponse } from './pojo/saved-post-response';
import { CheckRefreshTokenService } from '../check-refresh-token/check-refresh-token.service';

@Injectable({
  providedIn: 'root'
})
export class SavePostService {

  constructor(
    private getService: GetService,
    private postService: PostService,
    private checkRefreshToken: CheckRefreshTokenService
  ) { }

  private savedEndpoint: string = "/save-post";
  private getSavedEndpoint: string = "/get-save-post";
  public getSavePostStatusEndpoint: string = "/get-save-post-status";

  public savePostByUid(uid: number, post_id: number, saved: number): Observable<DefaultResponse> {
    this.checkRefreshToken.runCheckRefreshToken();
    const data = new SavedPostRequest(uid, post_id, saved);
    const body = JSON.stringify(data);
    let header: HttpHeaders = new HttpHeaders();
    header = header.append("Accept", 'application/json');
    header = header.append('Content-Type', 'application/json');
    return this.postService.post(this.savedEndpoint, header, body, true);
  }

  public getSavedPostsByUid(uid: number): Observable<GetPostResponse[]> {
    const parameter: string ="uid=" + uid; 
    const endpointWithParameter: string = this.getSavedEndpoint + "?" + parameter;
    const header: HttpHeaders = new HttpHeaders();
    return this.getService.get(endpointWithParameter, header, true);
  }

  public getSavedPostStatusByUid(uid: number, post_id: number): Observable<SavedPostResponse> {
    const parameter1: string ="uid=" + uid; 
    const parameter2: string ="pid=" + post_id; 
    const endpointWithParameter: string = this.getSavePostStatusEndpoint + "?" + parameter1 + "&" + parameter2;
    const header: HttpHeaders = new HttpHeaders();
    return this.getService.get(endpointWithParameter, header, true);
  }
}
