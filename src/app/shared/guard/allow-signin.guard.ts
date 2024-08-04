import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { StorageService } from '../storage/storage.service';
import { GetService } from '../services/get/get.service';
import { Observable, catchError, map, of } from 'rxjs';
import { CheckRefreshTokenService } from '../services/check-refresh-token/check-refresh-token.service';

@Injectable({
  providedIn: 'root'
})
export class AllowSignInGuard {

  constructor(
    private router: Router, 
    private getService: GetService,
    private storageService: StorageService,
    private checkRefreshToken: CheckRefreshTokenService
  ) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.checkRefreshToken.checkRefreshToken().pipe(
        map(e => {
            return false;
          }
        ),
        catchError((e) => {
            // window.location.href = "/error";
            return of(true);
        })
    )
  }
}