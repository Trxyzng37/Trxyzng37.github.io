import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PassCodeRequest } from '../../../shared/pojo/passcode-request';
import { DateTimeService } from '../../../shared/services/date-time/date-time.service';
import { PostService } from '../../../shared/services/post/post.service';
import { ServerUrlService } from '../../../shared/services/server-url/server-url.service';
import { ResendEmailPasscodeResponse } from '../../pojo/resend-email-passcode-response';
import { PasscodeResponse } from '../../../shared/pojo/passcode-response';
import { ResendEmailPasscodeRequest } from '../../pojo/resend-email-passcode-request';
import { StorageService } from '../../../shared/storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class ConfirmEmailService {

  constructor (
    private serverurl: ServerUrlService, 
    private postService: PostService,
    private dateTimeService: DateTimeService,
    private storageService: StorageService
  ) { }

  private endpoint: string = "/check-confirm-email-passcode";
  private fullUrl: string = this.serverurl.getUrl() + this.endpoint;

  public checkConfirmEmailPasscode(passcode: number): Observable<PasscodeResponse> {
    const email: string = this.storageService.getItem("signup-email");
    const pascode: number = passcode;
    const sendAt: Date = this.dateTimeService.getCurrentDateTime();
    const passcodeData: PassCodeRequest = new PassCodeRequest(email, pascode, sendAt);
    const body: string = JSON.stringify(passcodeData);
    let header: HttpHeaders = new HttpHeaders();
    header = header.append("Accept", 'application/json');
    header = header.append('Content-Type', 'application/json');
    return this.postService.post(this.endpoint, header, body, true);
  }

  public reSendPasscode(enpoint: string, email: string): Observable<ResendEmailPasscodeResponse> {
    // const endpoint: string = "/resend-confirm-email-passcode";
    const resendEmailPasscodeRequest: ResendEmailPasscodeRequest = new ResendEmailPasscodeRequest(email);
    const requestBody: string = JSON.stringify(resendEmailPasscodeRequest);
    let header: HttpHeaders = new HttpHeaders();
    header = header.append("Accept", 'application/json');
    header = header.append('Content-Type', 'application/json');
    return this.postService.post(enpoint, header, requestBody, true);
  }
}
