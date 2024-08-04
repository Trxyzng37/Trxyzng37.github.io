import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class ChooseUsernameGuard {

  constructor(
    private router: Router, 
    private storageService: StorageService
  ) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const uid: string = this.storageService.getItem("signup_google_email");
    if(uid.length >= 3) {
      return true;
    }
    else {
      this.router.navigate(['error']);
      return false;
    }
  }
}