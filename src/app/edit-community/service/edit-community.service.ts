import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateCommunityRequest } from 'src/app/create-community/pojo/create-community-request';
import { CreateCommunityResponse } from 'src/app/create-community/pojo/create-community-response';
import { PostService } from 'src/app/shared/services/post/post.service';
import { StorageService } from 'src/app/shared/storage/storage.service';
import { EditCommunityResponse } from '../pojo/edit-community-response';
import { EditCommunityRequest } from '../pojo/edit-community-request';
import { CheckRefreshTokenService } from 'src/app/shared/services/check-refresh-token/check-refresh-token.service';

@Injectable({
  providedIn: 'root'
})
export class EditCommunityService {

  constructor(
    private postService: PostService,
    private storageService: StorageService,
    private checkRefreshToken: CheckRefreshTokenService
  ) {}

  private endpoint: string = "/edit-community";

  editCommunity(community_id: number, uid: number, description: string, avatar: string, banner: string, scope: number): Observable<EditCommunityResponse> {
    this.checkRefreshToken.runCheckRefreshToken();
    const request = new EditCommunityRequest(community_id, uid, description, avatar, banner, scope);
    const body: string = JSON.stringify(request);
    let header: HttpHeaders = new HttpHeaders();
    header = header.append("Accept", 'application/json');
    header = header.append('Content-Type', 'application/json');
    return this.postService.post(this.endpoint, header, body, true);
  }
}
