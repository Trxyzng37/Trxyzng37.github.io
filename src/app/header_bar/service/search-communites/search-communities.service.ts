import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetService } from 'src/app/shared/services/get/get.service';
import { Communities } from '../pojo/communities';

@Injectable({
  providedIn: 'root'
})
export class SearchCommunitiesService {

  constructor(
    private getService: GetService
  ) { }

  private endpoint: string = "/find-community"

  public searchCommunities(name: string): Observable<Communities[]> {
    const parameter: string ="name=" + name; 
    const endpointWithParameter: string = this.endpoint + "?" + parameter;
    const header: HttpHeaders = new HttpHeaders();
    return this.getService.get(endpointWithParameter, header, false);
  }
}
