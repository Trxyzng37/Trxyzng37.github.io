import { Injectable } from '@angular/core';
import { GetService } from 'src/app/shared/services/get/get.service';
import { PostResponse } from '../pojo/post-response';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GetPostsService {

  constructor(
    private getService: GetService
  ) {}

  private endpoint: string = "/get-posts";

  public getAllPosts(): Observable<PostResponse[]> {
    const header: HttpHeaders = new HttpHeaders();
    return this.getService.get(this.endpoint, header, false);
  }
}
