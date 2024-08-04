import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GetService } from 'src/app/shared/services/get/get.service';
import { OpenGraphResponse } from '../../pojo/open-graph-response';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetOpenGraphService {

  constructor(
    private getService: GetService
  ) { }

  private endpoint: string = "/get-open-graph";
  getOpenGraphData(url: string): Observable<OpenGraphResponse> {
    const fullUrl = this.endpoint + "?" + "url=" + url;
    let header: HttpHeaders = new HttpHeaders();
    header = header.append("Accept", 'application/json');
    header = header.append('Content-Type', 'application/json');
    return this.getService.get(this.endpoint, header, true);
  }

}
