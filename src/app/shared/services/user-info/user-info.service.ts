import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetService } from '../get/get.service';
import { UserProfile } from '../../pojo/pojo/user-profile';

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {

  constructor(
    private getService: GetService
  ) { }

  private endpoint: string = "/get-user-info"

  public getUserInfo(uid: number): Observable<UserProfile> {
    const parameter: string ="uid=" + uid; 
    const endpointWithParameter: string = this.endpoint + "?" + parameter;
    const header: HttpHeaders = new HttpHeaders();true
    return this.getService.get(endpointWithParameter, header, true);
  }
}
