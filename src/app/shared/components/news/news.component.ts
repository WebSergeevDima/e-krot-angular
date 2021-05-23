import { Component, OnInit } from '@angular/core';
import { NewsService } from '../../services/news.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {

  public news: any

  constructor(private newsService: NewsService) { }

  ngOnInit(): void {

    this.getNews()
    
  }

  getNews() {

    this.newsService.getNews().subscribe((response) => {
      this.news = response['news']
      console.log(this.news)
    })

   
  }

}
