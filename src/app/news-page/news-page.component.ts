import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { NewsService } from '../shared/services/news.service';

@Component({
  selector: 'app-news-page',
  templateUrl: './news-page.component.html',
  styleUrls: ['./news-page.component.scss']
})
export class NewsPageComponent implements OnInit {

  public news: any = {
    title: '',
    text: '',
    dateCreate: ''
  }

  constructor(
    private router: Router, 
    private activatedRoute: ActivatedRoute,
    private newsService: NewsService
    ) {
      this.newsService.getNewsItem(activatedRoute.snapshot.params['id']).pipe(map( response => {
        if(response['status'] !== 'success') {
          this.router.navigate(['/'])
        }

        return response
      }
       
      )).subscribe((response) => {  

        this.news = response

      })
     
     }

  ngOnInit(): void { 
   
    
    
  }

}
