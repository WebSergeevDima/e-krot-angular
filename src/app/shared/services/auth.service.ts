import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { BASE_URL } from 'src/app/api-config';
import { User } from '../interfaces';
import { RolesService } from './roles.service';
import { Router } from '@angular/router';

@Injectable()

export class AuthService {

  constructor(
    private http: HttpClient,
    private router: Router,
    private roles: RolesService
  ) { }

  private setToket() {
    localStorage.removeItem('accessToken')
  }

  login(user: User) {
    return this.http.post(`${BASE_URL}/auth/login/`, JSON.stringify(user)).pipe(
      tap(this.setAccessToken),
      map(response => {
        this.roles.setRole(response['role'])
        this.router.navigate(['/user/panel/reports'])
        return response['accessToken']
      })
    )
  }

  setAccessToken(response) {
    localStorage.setItem('accessToken', response.accessToken)
  }

  logout() {
    this.setToket()
    this.roles.removeRole()
  }

  isAuthentificated() {

    console.log('isAuthentificated satrt')
    return this.http.post(`${BASE_URL}/auth/validate_token/`, JSON.stringify({ accessToken: localStorage.getItem('accessToken') })).pipe(
      map(resolve => {
        //console.log('isAuthentificated: ', resolve)
        this.roles.setRole(resolve['role'])
        return resolve['validateToken']
      })
    )


  }

}