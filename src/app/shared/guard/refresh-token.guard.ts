import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { StorageService } from '../storage/storage.service';
import { GetService } from '../services/get/get.service';
import { Observable, catchError, map, of } from 'rxjs';
import { CheckRefreshTokenService } from '../services/check-refresh-token/check-refresh-token.service';
import Swal from 'sweetalert2';
import { RemoveRefreshTokenService } from '../services/remove-refresh-token/remove-refresh-token.service';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RefreshTokenGuard {

  constructor(
    private router: Router, 
    private getService: GetService,
    private storageService: StorageService,
    private checkRefreshToken: CheckRefreshTokenService,
    private removeRefreshTokenService: RemoveRefreshTokenService
  ) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.checkRefreshToken.checkRefreshToken().pipe(
        map(e => {
            return true;
          }
        ),
        catchError((e) => {
            this.storageService.removeItem("uid");
            this.storageService.removeItem("username");
            this.removeRefreshTokenService.removeRefreshToken().subscribe();
            Swal.fire({
                title: "Authentication fail",
                text: "Please sign-in again",
                icon: "error",
                showConfirmButton: true,
                confirmButtonText: "Go to sign-in page"
            }).then((result)=>{
                if(result.isConfirmed) {
                    window.location.href = "/signin";
                }
            })
            return of(false);
        })
    )
  }
}