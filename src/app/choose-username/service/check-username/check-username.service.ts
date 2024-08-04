import { Injectable } from '@angular/core';
import { UsernameExistResponse } from './pojo/UsernameExistResponse';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { GetService } from 'src/app/shared/services/get/get.service';
import { DefaultResponse } from 'src/app/shared/pojo/default-response';
import { StorageService } from 'src/app/shared/storage/storage.service';
import { SelectUsernameRequest } from './pojo/select-username-request';
import { PostService } from 'src/app/shared/services/post/post.service';

@Injectable({
  providedIn: 'root'
})
export class CheckUsernameService {

  constructor(
    private getService: GetService,
    private storageService: StorageService,
    private postService: PostService
  ) { }

  checkUsernameEndpoint = "/check-username";
  selectUsernameEndpoint = "/select-username";

  isUsernameExist(username: string): Observable<UsernameExistResponse> {
    const fullUrl: string = this.checkUsernameEndpoint + "?username=" + username;
    let header: HttpHeaders = new HttpHeaders();
    return this.getService.get(fullUrl, header, true);
  }

  selectUsername(username: string): Observable<DefaultResponse> {
    const email = this.storageService.getItem("signup_google_email");
    const request = new SelectUsernameRequest(email, username);
    const body: string = JSON.stringify(request);
    let header: HttpHeaders = new HttpHeaders();
    header = header.append("Accept", 'application/json');
    header = header.append('Content-Type', 'application/json');
    return this.postService.post(this.selectUsernameEndpoint, header, body, true);
  }
}
