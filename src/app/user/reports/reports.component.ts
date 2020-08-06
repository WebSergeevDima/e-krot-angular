import { Component, OnInit, Input} from '@angular/core';
import { PanelService } from '../shared/services/panel.service';
import { CurrencyService } from 'src/app/shared/services/currency.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
})
export class ReportsComponent implements OnInit {
  

  public cur
  public allReports = []
  public reportPage = []
  public pageIndex: number = 0
  public pageSize: number = 10
  public length: number = 0

  constructor(
    private panelService: PanelService,
    private currencyService: CurrencyService
    ) { }

  ngOnInit(): void {   

    this.panelService.getUserAllReports(localStorage.getItem('accessToken')).subscribe(resolve => {
      this.allReports = resolve['allReports']
      this.reportPage = this.allReports.slice(0, 10)
      this.length = resolve['allReports'].length
    })

    this.cur = this.currencyService.getCurrency()

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

