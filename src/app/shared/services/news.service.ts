import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_URL } from 'src/app/api-config';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private http: HttpClient) { }

  getNews() {

    return this.http.get(`${BASE_URL}/news/all_news/`, {responseType: 'json'})

  }
  
}
