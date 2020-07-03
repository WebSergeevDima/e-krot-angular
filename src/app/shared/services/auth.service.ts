import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { BASE_URL } from 'src/app/api-config';
import { User, Token } from '../interfaces';

@Injectable()

export class AuthService {

  tokenValid: boolean
  testResult: any

  constructor(
    private http: HttpClient
  ) { }

  get token(): string {
    const expDate = new Date(localStorage.getItem('token-exp'))

    if (new Date > expDate) {
      this.logout()
      return null
    }


    return localStorage.getItem('token')
  }

  private setToket(response: Token) {

    console.log(response)

    if (response) {
      const expDate = new Date(new Date().getTime() + 55555000) // 5 second for use accaunt
      localStorage.setItem('token', response.idToken)
      localStorage.setItem('token-exp', expDate.toString())
    } else {
      localStorage.clear()
    }

  }

  login(user: User) {
    return this.http.post(`${BASE_URL}/auth/login/`, JSON.stringify(user)).pipe(
      tap(this.setToket),
      tap(this.setRefreshToken),
      tap(this.setAccessToken)
    )
    /*
    .pipe(
      map(result => {
        console.log('r', result)
        return result
      })
    )
*/

  }

  validateToken() {

    const accessToken = localStorage.getItem('accessToken')

    if (accessToken) {
      /*
            return this.http.post(`${BASE_URL}/auth/verify/`, JSON.stringify(accessToken)).pipe(
              map(response => {
                console.log('VERIFY SERVER', response)
                return response
              })
              // tap(this.setToket),
              // tap(this.setRefreshToket)
            )
      */

      const validate = this.http.post(`${BASE_URL}/auth/validate_token/`, JSON.stringify({ accessToken: accessToken })).pipe(
        map(response => {
          this.testResult = response
          return response['validateToken']
        })
      ).subscribe(response => {
        this.tokenValid = response
        console.log(response)
      })

      console.log('tokenValid', this.tokenValid)

      return false
    }


    console.log('accessToken not have in LS', accessToken);
    return false

  }

  setRefreshToken(response) {
    localStorage.setItem('refreshToken', response.refreshToken)
  }

  setAccessToken(response) {
    localStorage.setItem('accessToken', response.accessToken)
  }

  logout() {
    this.setToket(null)
  }

  isAuthentificated(): boolean {

    this.validateToken();
    console.log('DEBUG', this.testResult)
    console.log('tokenValid', this.tokenValid)
    //return !!this.token && !!this.tokenValid
    return true
  }



}