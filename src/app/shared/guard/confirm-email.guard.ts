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
export class ConfirmEmailGuard {
    constructor(
        private storageService: StorageService
    ) {}
    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const exist = this.storageService.getItem("signup-email");
        if(exist == "") {
            window.location.href = "/error";
            return false;
        }
        return true;
      }
}