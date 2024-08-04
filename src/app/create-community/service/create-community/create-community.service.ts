import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PostService } from 'src/app/shared/services/post/post.service';
import { StorageService } from 'src/app/shared/storage/storage.service';
import { CreateCommunityRequest } from '../../pojo/create-community-request';
import { HttpHeaders } from '@angular/common/http';
import { CreateCommunityResponse } from '../../pojo/create-community-response';
import { CheckRefreshTokenService } from 'src/app/shared/services/check-refresh-token/check-refresh-token.service';

@Injectable({
  providedIn: 'root'
})
export class CreateCommunityService {

  constructor(
    private postService: PostService,
    private storageService: StorageService,
    private checkRefreshToken: CheckRefreshTokenService
  ) {}

  private endpoint: string = "/create-community";

  createCommunity(uid: number, name: string, description: string, avatar: string, banner: string, scope: number): Observable<CreateCommunityResponse> {
      this.checkRefreshToken.runCheckRefreshToken();
    const request = new CreateCommunityRequest(uid, name, description, avatar, banner, scope);
    const body: string = JSON.stringify(request);
    let header: HttpHeaders = new HttpHeaders();
    header = header.append("Accept", 'application/json');
    header = header.append('Content-Type', 'application/json');
    return this.postService.post(this.endpoint, header, body, true);
  }
}
