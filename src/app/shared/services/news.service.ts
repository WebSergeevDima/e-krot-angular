import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_URL } from 'src/app/api-config';



@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private http: HttpClient) { }

  getNews(page: number) {

    return this.http.get(`${BASE_URL}/news/all_news/?page=${page}`)

  }
  
  getNewsItem(id: any) {

    return this.http.get(`${BASE_URL}/news/news.php?id=${id}`)

  }
  
}
