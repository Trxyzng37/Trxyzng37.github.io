import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetService } from 'src/app/shared/services/get/get.service';
import { UserProfile } from '../../pojo/pojo/user-profile';

@Injectable({
  providedIn: 'root'
})
export class SearchUserProfileService {

  constructor(
    private getService: GetService
  ) { }

  private endpoint: string = "/find-user-profile";
  private uid_endpoint: string = "/get-user-info-by-uid";

  public searchUserProfile(name: string): Observable<UserProfile[]> {
    const parameter: string ="name=" + name; 
    const endpointWithParameter: string = this.endpoint + "?" + parameter;
    const header: HttpHeaders = new HttpHeaders();
    return this.getService.get(endpointWithParameter, header, true);
  }

  public getUserProfileByName(endpoint: string, name: string): Observable<UserProfile> {
    const parameter: string ="username=" + name; 
    const endpointWithParameter: string = endpoint + "?" + parameter;
    const header: HttpHeaders = new HttpHeaders();
    return this.getService.get(endpointWithParameter, header, true);
  }

  public getUserProfileByUid(uid: number): Observable<UserProfile> {
    const parameter: string ="uid=" + uid; 
    const endpointWithParameter: string = this.uid_endpoint + "?" + parameter;
    const header: HttpHeaders = new HttpHeaders();
    return this.getService.get(endpointWithParameter, header, true);
  }
}
