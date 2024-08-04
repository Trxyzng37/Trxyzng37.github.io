import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetPostResponse } from 'src/app/post-link-list/pojo/get-post-response';
import { GetService } from 'src/app/shared/services/get/get.service';

@Injectable({
  providedIn: 'root'
})
export class GetPostService {

  constructor(
    private getService: GetService
  ) {}

  private endpoint: string = "/get-post";

  public getPostByPostId(post_id: number): Observable<GetPostResponse> {
    const fullUrl = this.endpoint + "?pid=" + post_id;
    console.log(fullUrl);
    const header: HttpHeaders = new HttpHeaders();
    return this.getService.get(fullUrl, header, true);
  }
}
