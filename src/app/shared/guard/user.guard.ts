import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class UserGuard {

  constructor(
    private router: Router, 
    private storageService: StorageService
  ) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const uid: number = this.storageService.getItem("uid") == "" ? 0 : parseInt(this.storageService.getItem("uid"));
    if(uid==0) {
        this.router.navigate(['error']);
        return false;
    }
    else {
      return true;
    }
  }
}