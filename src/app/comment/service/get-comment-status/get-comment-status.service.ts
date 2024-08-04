import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetService } from 'src/app/shared/services/get/get.service';
import { CommentStatusResponse } from '../../pojo/comment-status-response';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GetCommentStatusService {

  constructor(
    private getService: GetService
  ) { }

  private endpoint: string = "/get-comment-status";

  getCommentStatus(_id: number, uid: number): Observable<CommentStatusResponse> {
    const fullUrl: string = this.endpoint + "?_id=" + _id + "&uid=" + uid;
    let header: HttpHeaders = new HttpHeaders();
    return this.getService.get(fullUrl, header, true);
  }
}
