import { Injectable } from '@angular/core';
import { GetService } from '../get/get.service';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RemoveRefreshTokenService {

  constructor(
    private getService: GetService
  ) { }

  private signOuttEndpoint: string = "/sign-out";

  public removeRefreshToken(): Observable<any> {
    let header: HttpHeaders = new HttpHeaders();
    return this.getService.get(this.signOuttEndpoint, header, true);
  }
}
