import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { BASE_URL } from 'src/app/api-config';
import { User, Token } from '../interfaces';

@Injectable ()

export class AuthService {

  constructor(
    private http: HttpClient
  ) {}

  get token(): string {
    const expDate = new Date(localStorage.getItem('token-exp'))

    if(new Date > expDate) {
      this.logout()
      return null
    }


    return localStorage.getItem('token')
  }

  private setToket(response: Token) {
    
    console.log(response)

    if(response) {
      const expDate = new Date(new Date().getTime() + 3600 * 1000)
      localStorage.setItem('token', response.idToken)
      localStorage.setItem('token-exp', expDate.toString())
    } else {
      localStorage.clear()
    }

  }
    
  login(user: User) {
    return this.http.post(`${BASE_URL}/auth/getToken/`, JSON.stringify(user)).pipe(
      tap(this.setToket)
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

  logout() {
    this.setToket(null)
  }

  isAuthentificated(): boolean {
    return !! this.token
  }



}