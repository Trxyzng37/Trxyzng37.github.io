import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AccessTokenService } from '../../../shared/services/access-token/access-token.service';

@Injectable({
  providedIn: 'root'
})
export class signinGuard {

  constructor(private router: Router, private AccessTokenService: AccessTokenService) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
      let is_login: string = this.AccessTokenService.get_access_token();
      if (is_login === "")
        return true;
      else
        return false;
  }
}

// export const signinGuard: CanActivateFn = (route, state) => {
//   return inject(PermissionsService).canActivate(route, state);
// };
