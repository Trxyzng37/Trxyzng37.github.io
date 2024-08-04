import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EmailExistResponse } from '../../pojo/email-exist-response';
import { GetService } from '../../../shared/services/get/get.service';

@Injectable({
  providedIn: 'root'
})
export class EmailExistService {
  constructor(
    private getService: GetService
  ) {}

  private endpoint: string = "/is-email-exist";

  isEmailExist(email: string): Observable<EmailExistResponse> {
    const parameter: string ="email=" + email; 
    const endpointWithParameter = this.endpoint + "?" + parameter;
    const header: HttpHeaders = new HttpHeaders();
    return this.getService.get(endpointWithParameter, header, true);
  }
}
