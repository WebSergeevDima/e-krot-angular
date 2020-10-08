import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_URL } from 'src/app/api-config';

@Injectable({
  providedIn: 'root'
})
export class RatingService {

  constructor(
    private http: HttpClient
  ) { }

  create(data) {
    console.log(data)
    return this.http.post(`${BASE_URL}/rating/create_result/`, JSON.stringify(data))
  }
  addComment(data) {
    console.log(data)
    return this.http.post(`${BASE_URL}/rating/add_message/`, JSON.stringify(data))
  }

}
