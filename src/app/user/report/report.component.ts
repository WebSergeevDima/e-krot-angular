import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PanelService } from '../shared/services/panel.service';
import { CurrencyService } from 'src/app/shared/services/currency.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {

  public cur = this.currencyService.getCurrency()
  showOldCars: boolean = false

  public report = {
    tradeIn: {},
    oldCars: []
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private panelService: PanelService,
    public currencyService: CurrencyService
  ) {

  }

  ngOnInit(): void {

   // this.cur = this.currencyService.getCurrency()

    this.activatedRoute.paramMap.subscribe(params => {

      console.log('uniqId', params.get('uniqId'));

      this.panelService.getUserReport(params.get('uniqId'), localStorage.getItem('accessToken')).subscribe(resolve => {
        this.report = resolve['report']

        if (!!resolve['report']['oldCars']) {
          this.showOldCars = true
        }

      })

    });

  }

}
