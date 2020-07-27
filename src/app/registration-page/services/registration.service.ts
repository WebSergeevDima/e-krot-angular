import { Injectable } from '@angular/core';
import { NewUser } from 'src/app/shared/interfaces';
import { HttpClient } from '@angular/common/http';
import { BASE_URL } from 'src/app/api-config';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  createUser(user: NewUser) {
    return this.http.post(`${BASE_URL}/registration/createUser/`, JSON.stringify(user)).pipe(
      map(resolve => {
        console.log(resolve)
        /*
        if(resolve['validation']) {
          this.router.navigate(['/user/login'])
        }*/
        return resolve['validation']
      })
    )
  }


}
