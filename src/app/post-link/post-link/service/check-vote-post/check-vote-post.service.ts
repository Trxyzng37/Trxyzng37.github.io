import { Injectable } from '@angular/core';
import { GetService } from 'src/app/shared/services/get/get.service';
import { CheckVotePostResponse } from './pojo/check-vote-post-response';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CheckVotePostService {

  constructor(
    private getService: GetService
  ) { }

  private endpoint: string = "/check-vote-post";
  checkVotePost(postId: number, uid: number): Observable<CheckVotePostResponse> {
    const fullUrl = this.endpoint + "?" + "uid=" + uid + "&" + "postId=" + postId;
    console.log(fullUrl)
    let header: HttpHeaders = new HttpHeaders();
    header = header.append("Accept", 'application/json');
    header = header.append('Content-Type', 'application/json');
    return this.getService.get(fullUrl, header, true);
  }
}
