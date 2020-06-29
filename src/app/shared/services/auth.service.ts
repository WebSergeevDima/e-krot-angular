import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { BASE_URL } from 'src/app/api-config';
import { User, Token } from '../interfaces';

@Injectable()

export class AuthService {

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
      tap(this.setRefreshToket)
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

  verifyToken(): boolean {

    const token = localStorage.getItem('accessToken')

    if (token) {
      /*
            return this.http.post(`${BASE_URL}/auth/verify/`, JSON.stringify(token)).pipe(
              map(response => {
                console.log('VERIFY SERVER', response)
                return response
              })
              // tap(this.setToket),
              // tap(this.setRefreshToket)
            )
      */
      return true
    }


    console.log('token', token);
    return false

  }

  setRefreshToket(response) {
    localStorage.setItem('refreshToken', response.refreshToken)
  }

  logout() {
    this.setToket(null)
  }

  isAuthentificated(): boolean {

    const veryfay = this.verifyToken();

    if (!veryfay) {
      return veryfay
    }

    console.log('veryfay', veryfay)

    return !!this.token
  }



}