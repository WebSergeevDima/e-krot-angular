import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';

@Injectable()

export class AuthGuard implements CanActivate {

  private tokenValid: Observable<boolean>

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {

    this.tokenValid = this.auth.isAuthentificated()

    if (!this.tokenValid) {
      console.log('GUARD FALSE: ')
      this.auth.logout()
      this.router.navigate(['/user/login'], {
        queryParams: {
          login: false
        }
      })
    }

    return this.tokenValid

  }


}