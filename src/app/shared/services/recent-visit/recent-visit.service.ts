import { Injectable } from '@angular/core';
import { PostService } from '../post/post.service';
import { Observable } from 'rxjs';
import { RecentVisitRequest } from './pojo/recent-visit-request';
import { HttpHeaders } from '@angular/common/http';
import { DefaultResponse } from '../../pojo/default-response';
import { GetService } from '../get/get.service';
import { Communities } from '../../pojo/pojo/communities';
import { GetPostResponse } from 'src/app/post-link-list/pojo/get-post-response';

@Injectable({
  providedIn: 'root'
})
export class RecentVisitService {

  constructor(
    private postService: PostService,
    private getService: GetService
  ) { }

  public setRecentVisit(endpoint: string, uid: number, visit_id: number): Observable<DefaultResponse> {
    const body = JSON.stringify(new RecentVisitRequest(uid, visit_id));
    let header: HttpHeaders = new HttpHeaders();
    header = header.append("Accept", 'application/json');
    header = header.append('Content-Type', 'application/json');
    return this.postService.post(endpoint, header, body, true);
  }

  public getRecentVisitCommunity(uid: number): Observable<Communities[]> {
    const endpointWithParameter: string = "/get-recent-visit-community?" + "uid=" + uid;
    const header: HttpHeaders = new HttpHeaders();
    return this.getService.get(endpointWithParameter, header, true);
  }

  public getRecentVisitPost(uid: number): Observable<GetPostResponse[]> {
    const endpointWithParameter: string = "/get-recent-visit-post?" + "uid=" + uid;
    const header: HttpHeaders = new HttpHeaders();
    return this.getService.get(endpointWithParameter, header, true);
  }
}
