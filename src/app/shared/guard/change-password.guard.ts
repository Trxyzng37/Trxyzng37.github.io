import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class ChangePasswordGuard {
    constructor(
        private storageService: StorageService
    ) {}
    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const exist = this.storageService.getItem("change-password");
        if(exist == "") {
            window.location.href = "/error";
            return false;
        }
        return true;
      }
}