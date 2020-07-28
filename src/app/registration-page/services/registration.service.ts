import { Injectable } from '@angular/core';
import { NewUser } from 'src/app/shared/interfaces';
import { HttpClient } from '@angular/common/http';
import { BASE_URL } from 'src/app/api-config';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(
    private http: HttpClient
  ) { }

  createUser(user: NewUser) {
    return this.http.post(`${BASE_URL}/registration/createUser/`, JSON.stringify(user))
  }

}
