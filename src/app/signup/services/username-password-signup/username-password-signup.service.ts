import {HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServerUrlService } from '../../../shared/services/server-url/server-url.service';
import { UsernamePasswordSignupRequest } from '../../pojo/username-password-signup-request';
import { UsernamePasswordSignUpResponse } from '../../pojo/username-password-signup-response';
import { PostService } from '../../../shared/services/post/post.service';

@Injectable({
  providedIn: 'root'
})
export class SignupService {
  constructor (
    private serverurl: ServerUrlService, 
    private postService: PostService
    ) {}

  private endpoint: string = "/signup/username-password";
  private fullUrl: string = this.serverurl.getUrl() + this.endpoint;

  public UsernamePasswordSignUp(username: string, password: string, email: string): Observable<UsernamePasswordSignUpResponse> {
    const signUpData: UsernamePasswordSignupRequest = new UsernamePasswordSignupRequest(username, password, email);
    const body: string = JSON.stringify(signUpData);
    let header: HttpHeaders = new HttpHeaders();
    header = header.append("Accept", 'application/json');
    header = header.append('Content-Type', 'application/json');
    return this.postService.post(this.endpoint, header, body, true);
  }
}
