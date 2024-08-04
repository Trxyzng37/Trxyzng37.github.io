import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetService } from 'src/app/shared/services/get/get.service';
import { UserProfile } from '../pojo/user-profile';

@Injectable({
  providedIn: 'root'
})
export class SearchUserProfileService {

  constructor(
    private getService: GetService
  ) { }

  private endpoint: string = "/find-user-profile"

  public searchUserProfile(name: string): Observable<UserProfile[]> {
    const parameter: string ="name=" + name; 
    const endpointWithParameter: string = this.endpoint + "?" + parameter;
    const header: HttpHeaders = new HttpHeaders();
    return this.getService.get(endpointWithParameter, header, false);
  }
}
