import { Component, OnInit, Input, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PanelService } from '../shared/services/panel.service';
import { CurrencyService } from 'src/app/shared/services/currency.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {

  @Input() uniqId
  @Input() showOldCars: boolean = false
  @Input() report = {
    tradeIn: {},
    oldCars: []
  }
  @Input() cur
  //public uniqId



  constructor(
    private activatedRoute: ActivatedRoute,
    private panelService: PanelService,
    public currencyService: CurrencyService,
  ) {

  }
  ngOnInit(): void {


    this.activatedRoute.paramMap.pipe(map(params => {
      //this.uniqId = params.get('uniqId')
    })).subscribe(response => {
      console.log('report uniqId', response)
      this.showReport()
    })



  }



  showReport() {

    this.panelService.getUserReport(this.uniqId, localStorage.getItem('accessToken'), this.currencyService.getCurrency()).subscribe(resolve => {
      this.report = resolve['report']
      this.cur = resolve['currency']

      if (!!resolve['report']['oldCars']) {
        this.showOldCars = true
      }

    })




    this.activatedRoute.paramMap.subscribe(params => {
      /*
            console.log('uniqId', params.get('uniqId'));
      
            this.panelService.getUserReport(params.get('uniqId'), localStorage.getItem('accessToken'), this.currencyService.getCurrency()).subscribe(resolve => {
              this.report = resolve['report']
              this.cur = resolve['currency']
      
              if (!!resolve['report']['oldCars']) {
                this.showOldCars = true
              }
      
            })
      */
    });

  }

}
