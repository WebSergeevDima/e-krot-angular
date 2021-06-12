import { Component, OnInit } from '@angular/core';
import { NewsService } from '../../services/news.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {

  public show: boolean = false
  public news: any
  public pageNews: number = 1

  constructor(
    private newsService: NewsService
    ) { }

  ngOnInit(): void {

    this.getNews()
    
  }

  getNews() {

    this.newsService.getNews(this.pageNews).subscribe((response) => {

      this.news = response['news']

      //console.log(response['news'])

      this.show = response['news'].length > 0 ? true : false
      
    })

   
  }

}
