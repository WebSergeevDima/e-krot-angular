import { Component, OnInit} from '@angular/core';
import { PanelService } from '../shared/services/panel.service';
//import { MatPaginatorIntl } from '@angular/material/paginator';
//import { TranslateRuPaginator } from 'src/app/shared/components/paginator/translate-ru-paginator';


@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss'],
  /*providers: [
    { provide: MatPaginatorIntl, useValue: TranslateRuPaginator() }
  ]*/
})
export class PanelComponent implements OnInit {

  public allReports
  public reportPage
  pageIndex: number = 0;
  pageSize: number = 10;
  length: number

  links

  constructor(
    private panelService: PanelService,
    
    ) { }

  ngOnInit(): void {

   

    this.panelService.getUserAllReports(localStorage.getItem('accessToken')).subscribe(resolve => {
      this.allReports = resolve['allReports']
      this.reportPage = this.allReports.slice(0, 10)
      this.length = resolve['allReports'].length
    })

  }
  ngAfterContentInit() {
   
 } 
  paginatoreChange(event) {
    console.log('event', event)
    this.pageSize = event.pageSize
    this.pageIndex = event.pageIndex

    let startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    if (endIndex > this.length) {
      endIndex = this.length
    }
    this.reportPage = this.allReports.slice(startIndex, endIndex);



  }



}

