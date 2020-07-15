import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';

@Injectable()

export class AuthGuard implements CanActivate {

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {

    if (this.auth.isAuthentificated()) {
      console.log('GUARD TRUE: ')
      return true
    } else {

      console.log('GUARD FALSE: ')
      this.auth.logout()
      this.router.navigate(['/user/login'], {
        queryParams: {
          login: false
        }
      })

    }

    return undefined
  }

}