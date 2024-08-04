import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PostService } from '../../../app/shared/services/post/post.service';
import { ChangePasswordResponse } from '../pojo/change-password-response';
import { Observable } from 'rxjs';
import { ChangePasswordRequest } from '../pojo/change-password-request';
import { StorageService } from '../../../app/shared/storage/storage.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ChangePasswordService {

  constructor (
    private postService: PostService,
    private storageService: StorageService

  ) { }

  private endpoint: string = "/change-password"

  public changePassword(email: string, newPassword: string): Observable<ChangePasswordResponse> {
    const changePasswordRequest: ChangePasswordRequest = new ChangePasswordRequest(email, newPassword);
    const requestBody = JSON.stringify(changePasswordRequest);
    const header: HttpHeaders = new HttpHeaders();
    return this.postService.post(this.endpoint, header, requestBody, true);
  }
}
