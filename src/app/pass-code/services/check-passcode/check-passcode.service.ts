import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PassCodeRequest } from '../../../shared/pojo/passcode-request';
import { PasscodeResponse } from '../../../shared/pojo/passcode-response';
import { DateTimeService } from '../../../shared/services/date-time/date-time.service';
import { PostService } from '../../../shared/services/post/post.service';
import { StorageService } from '../../../shared/storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class CheckPasscodeService {
  constructor(
    private postService: PostService,
    private dateTimeService: DateTimeService,
    private storageService: StorageService
  ) {}

  private endpoint: string = "/check-passcode";

  checkPasscode(passcode: number): Observable<PasscodeResponse> {
    const email: string = this.storageService.getItem("forgot-password-email");
    const sendAt: Date = this.dateTimeService.getCurrentDateTime();
    const passcodeRequest: PassCodeRequest = new PassCodeRequest(email, passcode, sendAt);
    const requestBody: string = JSON.stringify(passcodeRequest);
    const header: HttpHeaders = new HttpHeaders();
    return this.postService.post(this.endpoint, header, requestBody, true);
  }
}
