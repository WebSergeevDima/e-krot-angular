import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { BASE_URL } from 'src/app/api-config';
import { User, Token } from '../interfaces';
import { Observable } from 'rxjs';

@Injectable()

export class AuthService {

  private tokenValid: boolean

  constructor(
    private http: HttpClient
  ) { }

  /*
    get token(): string {
      const expDate = new Date(localStorage.getItem('token-exp'))
  
      if (new Date > expDate) {
        this.logout()
        return null
      }
  
      return localStorage.getItem('token')
    }
  */

  private setToket() {
    //localStorage.clear()
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('accessToken')
  }

  login(user: User) {
    return this.http.post(`${BASE_URL}/auth/login/`, JSON.stringify(user)).pipe(
      tap(this.setRefreshToken),
      tap(this.setAccessToken)
    )
  }

  postValidateToken(accessToken) {

    return this.http.post(`${BASE_URL}/auth/validate_token/`, JSON.stringify({ accessToken: accessToken }))

  }

  postUpdateToken(accessToken, refreshToken) {

    return this.http.post(`${BASE_URL}/auth/update_token/`, JSON.stringify({
      refreshToken: refreshToken,
      accessToken: accessToken
    }))

  }

  validateToken() {

    const accessToken = localStorage.getItem('accessToken')

    if (accessToken) {

      return this.postValidateToken(accessToken).subscribe(response => {

        console.log('DEBUG: ', response)

        if (!response['validateToken']) {

          this.updateToken();

        }

        this.tokenValid = response['validateToken']
      })

    } else {

      console.log('accessToken not have in LS', accessToken);

      return false

    }

  }


  updateToken(): boolean {

    const accessToken = localStorage.getItem('accessToken')
    const refreshToken = localStorage.getItem('refreshToken')

    if (accessToken && refreshToken) {

      this.postUpdateToken(accessToken, refreshToken).pipe(
        tap(this.setAccessToken)
      ).subscribe(response => {

        console.log('DEBUG refreshToken: ', response)

        this.tokenValid = response['validateToken']
      })

      return false
    }

    console.log('Отсуствует RefreshToken', refreshToken);
    return false

  }

  setRefreshToken(response) {
    localStorage.setItem('refreshToken', response.refreshToken)
  }

  setAccessToken(response) {
    localStorage.setItem('accessToken', response.accessToken)
  }

  logout() {
    this.setToket()
  }

  isAuthentificated(): boolean {
    this.validateToken();
    console.log('tokenValid:::', !!this.tokenValid)
    //return !!this.token && !!this.tokenValid
    return true
  }

}